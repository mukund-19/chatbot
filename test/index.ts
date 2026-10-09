import { db } from '../server/db';
import { LanguageNormalizer } from '../server/ai/normalizer';
import { RecommendationEngine } from '../server/services/recommender';
import { ChurnScoreService } from '../server/services/churn';
import { BharatShopTools } from '../server/ai/tools';
import { DeterministicFallbackEngine } from '../server/ai/fallback';

async function runTestSuite() {
  console.log('=======================================================');
  console.log('🧪 Running BharatShop AI Automated Test Suite');
  console.log('=======================================================');

  let passed = 0;
  let failed = 0;

  function assert(description: string, condition: boolean) {
    if (condition) {
      console.log(`  ✓ ${description}`);
      passed++;
    } else {
      console.error(`  ✗ FAILED: ${description}`);
      failed++;
    }
  }

  // 1. Language & Hinglish Normalization
  console.log('\n--- 1. Testing Multilingual & Hinglish Normalizer ---');
  const h1 = LanguageNormalizer.normalize('I need a phone under ₹30,000 with a good camera and battery.');
  assert('Extracts budget <= 30000 from English', h1.maxPrice === 30000);
  assert('Identifies category Mobile Phones', h1.category === 'Mobile Phones');
  assert('Flags camera preference', h1.prioritizeCamera === true);
  assert('Flags battery preference', h1.prioritizeBattery === true);

  const h2 = LanguageNormalizer.normalize('Mujhe 2000 ke andar red saree chahiye aur Diwali se pehle delivery honi chahiye.');
  assert('Detects Hinglish language', h2.detectedLanguage === 'hinglish');
  assert('Extracts budget <= 2000 from Hinglish', h2.maxPrice === 2000);
  assert('Identifies category Sarees', h2.category === 'Sarees');
  assert('Identifies color Red', h2.color === 'Red');
  assert('Detects fast delivery / Diwali requirement', h2.requiresFastDelivery === true);

  const h3 = LanguageNormalizer.normalize('Punjabi vich samjhao kehra phone better aa');
  assert('Detects Punjabi vernacular tokens', h3.detectedLanguage === 'pa');

  const h4 = LanguageNormalizer.normalize('iPhone jaisa camera nahi chahiye');
  assert('Preserves camera negation correctly', h4.isNegatedCamera === true && h4.prioritizeCamera === false);

  const h5 = LanguageNormalizer.normalize('Compare first and third');
  assert('Extracts comparison pair indices [0, 2]', Boolean(h5.referencedProducts && h5.referencedProducts[0] === 0 && h5.referencedProducts[1] === 2));

  // 2. Structured Product Search & Hard Constraints
  console.log('\n--- 2. Testing Product Database & Hard Constraints ---');
  const allPhones = db.getProducts({ category: 'Mobile Phones' });
  assert('Has seeded mobile phones', allPhones.length >= 10);

  const budgetPhones = db.getProducts({ category: 'Mobile Phones', maxPrice: 30000 });
  const anyOverBudget = budgetPhones.some((p) => p.price > 30000);
  assert('Strictly enforces maxPrice <= 30000 hard constraint', !anyOverBudget && budgetPhones.length > 0);

  const redSarees = db.getProducts({ category: 'Sarees', color: 'Red', maxPrice: 2000 });
  assert('Finds red sarees under ₹2000', redSarees.length > 0);

  // 3. Recommendation Scoring Engine
  console.log('\n--- 3. Testing Recommendation Scoring Engine ---');
  const recs = RecommendationEngine.rankProducts(budgetPhones, h1, db.getProfile('usr-demo-001'));
  assert('Produces ranked recommendations', recs.length > 0);
  assert('Top recommendation has valid score between 0 and 1', (recs[0].recommendation_score || 0) > 0 && (recs[0].recommendation_score || 0) <= 1);
  assert('Includes 3 highlights and why_recommended', recs[0].highlights !== undefined && recs[0].why_recommended !== undefined);

  // 4. Order Status Tracking
  console.log('\n--- 4. Testing Order Lookup (ORD-10025) ---');
  const orderRes = await BharatShopTools.executeTool('getOrderStatus', { orderNumber: 'ORD-10025' }, { userId: 'usr-demo-001' });
  assert('Finds order ORD-10025', orderRes.found === true);
  assert('Returns real courier and status', orderRes.order.status === 'shipped' && orderRes.order.courier === 'Delhivery Express');

  // 5. Policy Knowledge Base Retrieval
  console.log('\n--- 5. Testing Policy RAG Document Retrieval ---');
  const policyRes = await BharatShopTools.executeTool('getPolicy', { type: 'return_policy', language: 'en' }, { userId: 'usr-demo-001' });
  assert('Retrieves 7-day and 14-day return policy', policyRes.found === true && policyRes.content.includes('7-day'));

  // 6. Cart and Wishlist Mutations
  console.log('\n--- 6. Testing Cart & Wishlist Mutations ---');
  const testUser = `usr-test-${Date.now()}`;
  const cartRes = await BharatShopTools.executeTool('addToCart', { productId: 'prod-mob-001', quantity: 1 }, { userId: testUser });
  assert('Adds product to cart', cartRes.success === true && cartRes.itemCount >= 1);

  const wishRes = await BharatShopTools.executeTool('toggleWishlist', { productId: 'prod-sar-001' }, { userId: testUser });
  assert('Toggles product in wishlist (added)', wishRes.success === true && wishRes.added === true);
  const wishToggleOff = await BharatShopTools.executeTool('toggleWishlist', { productId: 'prod-sar-001' }, { userId: testUser });
  assert('Toggles product off in wishlist (removed)', wishToggleOff.success === true && wishToggleOff.added === false);

  // 7. Support Ticket Escalation
  console.log('\n--- 7. Testing Support Ticket Escalation ---');
  const tktRes = await BharatShopTools.executeTool('createSupportTicket', { category: 'Delivery', summary: 'Where is my order?' }, { userId: testUser });
  assert('Creates support ticket with TKT- prefix', tktRes.ticketCreated === true && tktRes.ticketNumber.startsWith('TKT-'));

  // 8. Churn Intelligence Service
  console.log('\n--- 8. Testing Churn Intelligence Service ---');
  const churnLow = ChurnScoreService.predict({ days_since_last_order: 3, total_orders_lifetime: 8, complaint_count: 0 });
  assert('Predicts low churn band for active loyal customer', churnLow.band === 'low' && churnLow.probability < 0.4);

  const churnHigh = ChurnScoreService.predict({ days_since_last_order: 90, total_orders_lifetime: 1, complaint_count: 2 });
  assert('Predicts high churn band for lapsed customer with complaints', churnHigh.band === 'high' && churnHigh.probability > 0.6);
  assert('Recommends retention intervention with coupon code', churnHigh.retention_intervention !== undefined);

  // 9. Deterministic Fallback Engine End-to-End
  console.log('\n--- 9. Testing Deterministic End-to-End Fallback Engine ---');
  const chatOutput = await DeterministicFallbackEngine.execute({
    sessionId: 'test-sess-001',
    message: 'I need a phone under ₹30,000 with a good camera and battery.',
    lastProductIds: [],
  });
  assert('Returns grounded response text', chatOutput.text.length > 20);
  assert('Attaches structured product cards', Boolean(chatOutput.products && chatOutput.products.length > 0));
  assert('Attaches executed tool calls', Boolean(chatOutput.toolCalls && chatOutput.toolCalls.length > 0));

  console.log('=======================================================');
  console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
  console.log('=======================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
