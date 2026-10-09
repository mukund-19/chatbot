// ============================================================================
// BharatShop AI: Multilingual & Hinglish Canonicalization Layer
// ============================================================================

export interface NormalizedIntentContext {
  originalText: string;
  cleanedText: string;
  detectedLanguage: string;
  maxPrice?: number;
  minPrice?: number;
  category?: string;
  color?: string;
  size?: string;
  requiresFastDelivery: boolean;
  festivalContext?: string;
  prioritizeCamera: boolean;
  prioritizeBattery: boolean;
  prioritizePriceLow: boolean;
  productReferenceIndex?: number; // 0-based
  referencedProducts?: number[]; // indices for comparison
  isNegatedCamera: boolean;
  isNegatedBattery: boolean;
  isOrderQuery: boolean;
  orderNumberQuery?: string;
  isPolicyQuery: boolean;
  policyType?: string;
  isSupportQuery: boolean;
  isCartAction: 'add' | 'remove' | 'view' | null;
  isWishlistAction: 'add' | 'remove' | 'view' | null;
}

export class LanguageNormalizer {
  /**
   * Detects user language from character sets and vernacular token indicators
   */
  public static detectLanguage(text: string): string {
    const raw = text.trim();

    // Devanagari script (Hindi, Marathi)
    if (/[\u0900-\u097F]/.test(raw)) {
      if (/\b(aahe|nahi|kay|kasa)\b/i.test(raw)) return 'mr';
      return 'hi';
    }
    // Gurmukhi script (Punjabi)
    if (/[\u0A00-\u0A7F]/.test(raw)) return 'pa';
    // Bengali script
    if (/[\u0980-\u09FF]/.test(raw)) return 'bn';
    // Tamil script
    if (/[\u0B80-\u0BFF]/.test(raw)) return 'ta';
    // Telugu script
    if (/[\u0C00-\u0C7F]/.test(raw)) return 'te';
    // Gujarati script
    if (/[\u0A80-\u0AFF]/.test(raw)) return 'gu';
    // Kannada script
    if (/[\u0C80-\u0CFF]/.test(raw)) return 'kn';
    // Malayalam script
    if (/[\u0D00-\u0D7F]/.test(raw)) return 'ml';
    // Urdu / Arabic script
    if (/[\u0600-\u06FF]/.test(raw)) return 'ur';

    // Romanized Indic tokens
    const lower = raw.toLowerCase();
    if (/\b(vich|samjhao|kehra|dasso|chahida|chahidi|tussi)\b/i.test(lower)) {
      return 'pa'; // Punjabi in Roman script
    }
    if (/\b(chahiye|dikhao|karo|batao|kaunsa|kaisi|accha|sasta|mehenga|mera|meri|wala|wali|hain|hai)\b/i.test(lower)) {
      return 'hinglish';
    }
    if (/\b(kemon|bhalo|dorkar|aache|korun)\b/i.test(lower)) {
      return 'bn';
    }
    if (/\b(venum|paakanum|engae|nalla)\b/i.test(lower)) {
      return 'ta';
    }
    if (/\b(kaavali|chudandi|ela|undi)\b/i.test(lower)) {
      return 'te';
    }

    return 'en';
  }

  /**
   * Canonicalizes natural language inputs and extracts structured shopping constraints
   */
  public static normalize(text: string): NormalizedIntentContext {
    const raw = text.trim();
    const lower = raw.toLowerCase();
    const lang = this.detectLanguage(raw);

    const context: NormalizedIntentContext = {
      originalText: raw,
      cleanedText: lower,
      detectedLanguage: lang,
      requiresFastDelivery: false,
      prioritizeCamera: false,
      prioritizeBattery: false,
      prioritizePriceLow: false,
      isNegatedCamera: false,
      isNegatedBattery: false,
      isOrderQuery: false,
      isPolicyQuery: false,
      isSupportQuery: false,
      isCartAction: null,
      isWishlistAction: null,
    };

    // 1. Order queries & ORD- numbers
    const orderMatch = raw.match(/ORD-\d{4,6}/i);
    if (orderMatch) {
      context.isOrderQuery = true;
      context.orderNumberQuery = orderMatch[0].toUpperCase();
    } else if (
      lower.includes('order status') ||
      lower.includes('track order') ||
      lower.includes('mera order') ||
      lower.includes('order kahan hai') ||
      lower.includes('where is my order')
    ) {
      context.isOrderQuery = true;
    }

    // 2. Policy detection (Return, Exchange, Cancellation, Delivery, Payment, COD)
    if (
      lower.includes('return policy') ||
      lower.includes('return') ||
      lower.includes('vapis') ||
      lower.includes('wapas') ||
      lower.includes('refund')
    ) {
      context.isPolicyQuery = true;
      context.policyType = 'return_policy';
    } else if (lower.includes('exchange') || lower.includes('badalna')) {
      context.isPolicyQuery = true;
      context.policyType = 'exchange_policy';
    } else if (lower.includes('cancel') || lower.includes('cancellation') || lower.includes('radd')) {
      context.isPolicyQuery = true;
      context.policyType = 'cancellation_policy';
    } else if (lower.includes('cod') || lower.includes('cash on delivery')) {
      context.isPolicyQuery = true;
      context.policyType = 'cod_info';
    } else if (lower.includes('delivery time') || lower.includes('shipping time')) {
      context.isPolicyQuery = true;
      context.policyType = 'delivery_policy';
    }

    // 3. Support & Escalation
    if (
      lower.includes('customer support') ||
      lower.includes('support agent') ||
      lower.includes('human') ||
      lower.includes('complaint') ||
      lower.includes('shikayat') ||
      lower.includes('baat karni hai') ||
      lower.includes('talk to agent') ||
      lower.includes('escalate')
    ) {
      context.isSupportQuery = true;
    }

    // 4. Cart & Wishlist actions
    if (lower.includes('add to cart') || lower.includes('cart mein daalo') || lower.includes('cart me add')) {
      context.isCartAction = 'add';
    } else if (lower.includes('remove from cart') || lower.includes('cart se hatao')) {
      context.isCartAction = 'remove';
    } else if (lower.includes('show cart') || lower.includes('view cart') || lower.includes('mera cart')) {
      context.isCartAction = 'view';
    }

    if (lower.includes('wishlist') || lower.includes('save for later')) {
      context.isWishlistAction = lower.includes('remove') ? 'remove' : 'add';
    }

    // 5. Price & Budget extraction
    // Pre-nominal: "under 30k", "under ₹30,000", "below 2000"
    // Post-nominal: "2000 ke andar", "2000 rupaye ke under", "30k ke under", "30 hazar tak"
    const postNominalK = lower.match(/(\d+)\s*(?:k|hazar|hazaar)\s*(?:ke\s*andar|ke\s*under|se\s*kam|tak)/i);
    const postNominalNum = lower.match(/([\d,]+)\s*(?:rupaye\s*ke\s*under|rupaye\s*ke\s*andar|ke\s*andar|ke\s*under|se\s*kam|tak)/i);

    if (postNominalK) {
      context.maxPrice = parseInt(postNominalK[1], 10) * 1000;
    } else if (postNominalNum) {
      const num = parseInt(postNominalNum[1].replace(/,/g, ''), 10);
      if (!isNaN(num) && num > 50) {
        context.maxPrice = num;
      }
    } else {
      const budgetKMatch = lower.match(/(?:under|below|less than|<|andar|ke andar|se kam)\s*(?:₹|rs\.?|inr)?\s*(\d+)\s*(?:k|hazar|hazaar|thousand)/i);
      if (budgetKMatch) {
        context.maxPrice = parseInt(budgetKMatch[1], 10) * 1000;
      } else {
        const budgetDirectK = lower.match(/(\d+)\s*k\b/i);
        if (budgetDirectK && (lower.includes('under') || lower.includes('andar') || lower.includes('below') || lower.includes('budget'))) {
          context.maxPrice = parseInt(budgetDirectK[1], 10) * 1000;
        } else {
          const budgetHazarMatch = lower.match(/(\d+)\s*(?:hazar|hazaar)\b/i);
          if (budgetHazarMatch) {
            context.maxPrice = parseInt(budgetHazarMatch[1], 10) * 1000;
          } else {
            const budgetNumMatch = lower.match(/(?:under|below|less than|andar|ke andar|se kam|budget|₹)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
            if (budgetNumMatch) {
              const num = parseInt(budgetNumMatch[1].replace(/,/g, ''), 10);
              if (!isNaN(num) && num > 100) {
                context.maxPrice = num;
              }
            }
          }
        }
      }
    }

    // 6. Fast delivery & Festival context (Diwali, etc.)
    if (
      lower.includes('diwali') ||
      lower.includes('jaldi delivery') ||
      lower.includes('fast delivery') ||
      lower.includes('urgent') ||
      lower.includes('quick delivery') ||
      lower.includes('turant')
    ) {
      context.requiresFastDelivery = true;
      if (lower.includes('diwali')) {
        context.festivalContext = 'Diwali';
      }
    }

    // 7. Soft preferences and Negation Preservation
    // Check camera negation: "nahi chahiye", "mat dikhao", "no camera"
    const hasCameraWord = lower.includes('camera') || lower.includes('photo') || lower.includes('picture');
    const hasBatteryWord = lower.includes('battery') || lower.includes('backup') || lower.includes('mah');

    const hasNegation =
      lower.includes('nahi') ||
      lower.includes('mat') ||
      lower.includes('not') ||
      lower.includes('without') ||
      lower.includes('bina');

    if (hasCameraWord) {
      if (hasNegation && (lower.includes('camera nahi') || lower.includes('camera mat') || lower.includes('no camera'))) {
        context.isNegatedCamera = true;
      } else {
        context.prioritizeCamera = true;
      }
    }

    if (hasBatteryWord) {
      if (hasNegation && (lower.includes('battery nahi') || lower.includes('no battery'))) {
        context.isNegatedBattery = true;
      } else {
        context.prioritizeBattery = true;
      }
    }

    if (lower.includes('sasta') || lower.includes('sasti') || lower.includes('budget') || lower.includes('affordable') || lower.includes('cheap')) {
      context.prioritizePriceLow = true;
    }

    // 8. Categories & Colors
    if (lower.includes('phone') || lower.includes('mobile') || lower.includes('smartphone')) {
      context.category = 'Mobile Phones';
    } else if (lower.includes('saree') || lower.includes('sari')) {
      context.category = 'Sarees';
    } else if (lower.includes('kurti') || lower.includes('kurta')) {
      context.category = 'Kurtis';
    } else if (lower.includes('laptop')) {
      context.category = 'Laptops';
    } else if (lower.includes('headphone') || lower.includes('earbuds') || lower.includes('earphone') || lower.includes('tws')) {
      context.category = 'Headphones';
    } else if (lower.includes('watch') || lower.includes('smartwatch')) {
      context.category = 'Smartwatches';
    } else if (lower.includes('shoe') || lower.includes('sneaker')) {
      context.category = 'Shoes';
    } else if (lower.includes('tv') || lower.includes('television')) {
      context.category = 'TV';
    }

    // Colors
    if (lower.includes('red') || lower.includes('laal')) context.color = 'Red';
    else if (lower.includes('blue') || lower.includes('neela')) context.color = 'Blue';
    else if (lower.includes('black') || lower.includes('kala')) context.color = 'Black';
    else if (lower.includes('white') || lower.includes('safed')) context.color = 'White';
    else if (lower.includes('green') || lower.includes('hara')) context.color = 'Green';

    // Size (e.g. "size 9", "size 8", "size M", "size XL")
    const sizeMatch = lower.match(/size\s*([0-9a-z]+)/i);
    if (sizeMatch) {
      context.size = sizeMatch[1].toUpperCase();
    }

    // 9. Conversational References (First, Second, Third, Comparison)
    // "pehle aur teesre", "compare 1 and 3", "first and second", "pehle wala", "dusra wala", "teesra"
    const comparePairMatch = lower.match(/(?:compare|tulna)\s*(?:the\s*)?(?:first|pehle|1st|1)\s*(?:and|aur|&)\s*(?:the\s*)?(?:second|third|dusre|teesre|2nd|3rd|2|3)/i) ||
                             lower.match(/(?:pehle|1)\s*(?:aur|and)\s*(?:teesre|3|dusre|2)\s*(?:wale\s*)?(?:ko\s*)?(?:compare)/i);
    if (comparePairMatch) {
      if (lower.includes('third') || lower.includes('teesre') || lower.includes('3')) {
        context.referencedProducts = [0, 2]; // 1st and 3rd
      } else {
        context.referencedProducts = [0, 1]; // 1st and 2nd
      }
    } else if (lower.includes('first') || lower.includes('pehla') || lower.includes('pehle') || lower.includes('1st')) {
      context.productReferenceIndex = 0;
    } else if (lower.includes('second') || lower.includes('dusra') || lower.includes('doosra') || lower.includes('2nd')) {
      context.productReferenceIndex = 1;
    } else if (lower.includes('third') || lower.includes('teesra') || lower.includes('3rd')) {
      context.productReferenceIndex = 2;
    } else if (lower.includes('last') || lower.includes('aakhri')) {
      context.productReferenceIndex = 999;
    }

    return context;
  }
}
