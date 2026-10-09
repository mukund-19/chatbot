import { Product, RecommendedProduct, RecommendationExplanation, UserProfile } from '../../src/types/index';
import { db } from '../db';
import { NormalizedIntentContext } from '../ai/normalizer';

export interface RecommendationWeights {
  constraint_match: number;
  personalization: number;
  quality: number;
  value: number;
  availability: number;
  delivery_fit: number;
}

export class RecommendationEngine {
  private static defaultWeights: RecommendationWeights = {
    constraint_match: 0.30,
    personalization: 0.20,
    quality: 0.15,
    value: 0.15,
    availability: 0.10,
    delivery_fit: 0.10,
  };

  /**
   * Ranks candidate products using deterministic multi-objective scoring
   */
  public static rankProducts(
    candidates: Product[],
    context: NormalizedIntentContext,
    userProfile?: UserProfile | null
  ): RecommendedProduct[] {
    const configuredWeights = db.getSettings('recommendation_weights') || this.defaultWeights;
    const isPersonalizationAllowed = userProfile ? userProfile.personalization_enabled : true;

    const scored = candidates.map((product) => {
      // 1. Constraint Match (0.0 to 1.0)
      let constraintScore = 1.0;
      if (context.maxPrice && product.price > context.maxPrice) {
        // Hard constraint violation drops constraint score to 0
        constraintScore = 0.0;
      } else if (context.maxPrice) {
        // Fits budget comfortably
        const budgetRatio = product.price / context.maxPrice;
        constraintScore = budgetRatio <= 1 ? 0.85 + (0.15 * (1 - budgetRatio)) : 0.0;
      }

      if (context.color) {
        const matchesColor = product.color_options.some((c) =>
          c.toLowerCase().includes(context.color!.toLowerCase())
        ) || product.name.toLowerCase().includes(context.color!);
        if (!matchesColor) constraintScore *= 0.5;
      }

      if (context.size) {
        const matchesSize = product.size_options.some((s) =>
          s.toLowerCase().includes(context.size!.toLowerCase())
        );
        if (!matchesSize && product.size_options.length > 0 && !product.size_options.includes('Standard')) {
          constraintScore *= 0.4;
        }
      }

      // 2. Personalization (0.0 to 1.0)
      let personalizationScore = 0.5; // Neutral baseline
      if (isPersonalizationAllowed && userProfile) {
        // Category affinity
        if (userProfile.preferred_categories.includes(product.category)) {
          personalizationScore += 0.25;
        }
        // Budget match
        if (product.price >= userProfile.budget_min && product.price <= userProfile.budget_max) {
          personalizationScore += 0.15;
        }
        // Soft preferences
        if (context.prioritizeCamera && (product.tags.includes('camera') || product.specifications['Camera'])) {
          personalizationScore += 0.1;
        }
        if (context.prioritizeBattery && (product.tags.includes('battery') || product.specifications['Battery'])) {
          personalizationScore += 0.1;
        }
        personalizationScore = Math.min(1.0, personalizationScore);
      } else {
        personalizationScore = 0.5; // neutral
      }

      // 3. Quality Score (Rating & Reviews normalized)
      const ratingNormalized = (product.rating - 3.5) / 1.5; // 3.5-5.0 scale
      const reviewNormalized = Math.min(1.0, Math.log10(product.review_count + 1) / 5.0);
      const qualityScore = Math.max(0.0, Math.min(1.0, 0.7 * ratingNormalized + 0.3 * reviewNormalized));

      // 4. Value Score (Discount & Price relative to features)
      let valueScore = 0.7;
      if (product.original_price && product.original_price > product.price) {
        const discountRatio = (product.original_price - product.price) / product.original_price;
        valueScore = Math.min(1.0, 0.5 + discountRatio);
      }
      if (context.prioritizePriceLow) {
        valueScore = Math.min(1.0, valueScore + 0.2);
      }

      // 5. Availability Score (Stock quantity)
      const availabilityScore = product.stock_qty > 10 ? 1.0 : product.stock_qty > 0 ? 0.7 : 0.0;

      // 6. Delivery Fit Score (Fast delivery requirements)
      let deliveryFitScore = 0.8;
      if (context.requiresFastDelivery) {
        deliveryFitScore = product.delivery_days <= 2 ? 1.0 : product.delivery_days <= 3 ? 0.7 : 0.4;
      } else {
        deliveryFitScore = product.delivery_days <= 2 ? 0.95 : 0.85;
      }

      // Final Weighted Score
      const finalScore =
        configuredWeights.constraint_match * constraintScore +
        configuredWeights.personalization * personalizationScore +
        configuredWeights.quality * qualityScore +
        configuredWeights.value * valueScore +
        configuredWeights.availability * availabilityScore +
        configuredWeights.delivery_fit * deliveryFitScore;

      const explanation: RecommendationExplanation = {
        constraint_match: Number(constraintScore.toFixed(2)),
        personalization: Number(personalizationScore.toFixed(2)),
        quality: Number(qualityScore.toFixed(2)),
        value: Number(valueScore.toFixed(2)),
        availability: Number(availabilityScore.toFixed(2)),
        delivery_fit: Number(deliveryFitScore.toFixed(2)),
        final_score: Number(finalScore.toFixed(2)),
      };

      // Generate 3 Highlights
      const highlights: string[] = [];
      if (product.specifications['Battery']) highlights.push(`🔋 ${product.specifications['Battery']}`);
      if (product.specifications['Camera']) highlights.push(`📸 ${product.specifications['Camera']}`);
      if (product.specifications['Fabric']) highlights.push(`🧵 ${product.specifications['Fabric']}`);
      if (product.specifications['Processor']) highlights.push(`⚡ ${product.specifications['Processor']}`);
      if (product.specifications['MotorPower']) highlights.push(`⚙️ ${product.specifications['MotorPower']}`);
      if (highlights.length < 3 && product.rating >= 4.4) highlights.push(`⭐ Top Rated ${product.rating}/5.0`);
      if (highlights.length < 3) highlights.push(`🚚 Fast ${product.delivery_days}-Day Delivery`);
      if (highlights.length < 3 && product.original_price) {
        const pct = Math.round(((product.original_price - product.price) / product.original_price) * 100);
        highlights.push(`🏷️ Save ${pct}% Today`);
      }

      // Customer-friendly explanation
      let whyRecommended = `Fits your criteria with a strong ${product.rating}★ rating and verified reviews.`;
      if (context.maxPrice && product.price <= context.maxPrice) {
        whyRecommended = `Well within your ₹${context.maxPrice.toLocaleString('en-IN')} budget with outstanding performance.`;
      }
      if (context.prioritizeCamera && (product.tags.includes('camera') || product.specifications['Camera'])) {
        whyRecommended = `Top camera performer with excellent optical stabilization and high-resolution sensor.`;
      } else if (context.prioritizeBattery && (product.tags.includes('battery') || product.specifications['Battery'])) {
        whyRecommended = `Best-in-class battery endurance designed for heavy all-day usage.`;
      } else if (context.requiresFastDelivery) {
        whyRecommended = `Guaranteed fast ${product.delivery_days}-day express delivery ready for immediate dispatch.`;
      }

      const rec: RecommendedProduct = {
        ...product,
        recommendation_score: Number(finalScore.toFixed(2)),
        recommendation_explanation: explanation,
        why_recommended: whyRecommended,
        highlights: highlights.slice(0, 3),
      };

      return rec;
    });

    // Filter out hard constraint violations if any products meet the criteria
    let validMatches = scored.filter((p) => (context.maxPrice ? p.price <= context.maxPrice : true));
    if (validMatches.length === 0) {
      validMatches = scored; // If strictly nothing under budget, return scored items with high scores first
    }

    // Sort descending by final_score
    return validMatches.sort((a, b) => (b.recommendation_score || 0) - (a.recommendation_score || 0));
  }
}
