import { KnowledgeDocument } from '../../src/types/index';

export const SEED_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-001',
    type: 'return_policy',
    title: 'BharatShop 7-Day & 14-Day Return Policy',
    language: 'en',
    version: '2.1',
    active: true,
    updated_at: '2026-09-01T00:00:00Z',
    content: `BharatShop AI Return Policy Overview:
1. Electronics, Mobiles, and Laptops have a 7-day return/replacement window from delivery for defective, damaged, or dead-on-arrival items. Brand technician verification may apply.
2. Fashion, Sarees, Kurtis, Footwear, and Apparel carry a 14-day hassle-free return window. The product must be unworn, unwashed, with all original security tags and packaging intact.
3. Personal care, cosmetics, and innerwear are non-returnable due to hygiene regulations unless received damaged or expired.
4. Refunds are credited to the original payment method (UPI/Card) within 24-48 hours after courier pickup verification. For Cash on Delivery (COD) orders, refunds are disbursed instantly via UPI ID or direct NEFT bank transfer.`
  },
  {
    id: 'doc-001-hi',
    type: 'return_policy',
    title: 'भारतशॉप रिटर्न नीति (Return Policy in Hindi)',
    language: 'hi',
    version: '2.1',
    active: true,
    updated_at: '2026-09-01T00:00:00Z',
    content: `भारतशॉप AI रिटर्न नीति (Hindi):
1. इलेक्ट्रॉनिक्स, मोबाइल और लैपटॉप डिलीवरी की तारीख से 7 दिनों के भीतर खराबी या नुकसान होने पर बदले या लौटाए जा सकते हैं।
2. फैशन, साड़ियां, कुर्तियां और जूतों के लिए 14 दिन की आसान रिटर्न सुविधा है। उत्पाद बिना इस्तेमाल किया हुआ और मूल टैग के साथ होना चाहिए।
3. पिकअप के 24-48 घंटों के भीतर आपका रिफंड मूल UPI खाते या बैंक खाते में वापस आ जाता है। COD ऑर्डर्स के लिए आप अपना UPI ID देकर तुरंत रिफंड प्राप्त कर सकते हैं।`
  },
  {
    id: 'doc-002',
    type: 'exchange_policy',
    title: 'Size & Color Exchange Policy',
    language: 'en',
    version: '1.4',
    active: true,
    updated_at: '2026-08-15T00:00:00Z',
    content: `BharatShop Exchange Policy:
1. Free doorstep size exchange is available for apparel, sarees, and footwear within 14 days of delivery.
2. If the desired replacement size is out of stock, you can opt for an immediate 100% store credit voucher or complete source refund.
3. The delivery agent will bring the replacement item and collect the original item in the same visit (Reverse Pickup & Swap) in most Tier-1 and Tier-2 Indian cities.`
  },
  {
    id: 'doc-003',
    type: 'cancellation_policy',
    title: 'Order Cancellation Guidelines',
    language: 'en',
    version: '1.2',
    active: true,
    updated_at: '2026-08-01T00:00:00Z',
    content: `Order Cancellation Policy:
1. You can cancel any order free of charge at any time before it is dispatched/shipped from our fulfillment center directly from the Orders tab or by asking BharatShop AI assistant.
2. Once dispatched, you may simply refuse delivery at your doorstep when the courier calls.
3. Prepaid order cancellations receive 100% automatic refund back to source UPI / Net Banking within 2-4 hours of cancellation approval.`
  },
  {
    id: 'doc-004',
    type: 'delivery_policy',
    title: 'Shipping and Delivery Timelines in India',
    language: 'en',
    version: '2.0',
    active: true,
    updated_at: '2026-09-10T00:00:00Z',
    content: `Shipping and Delivery Policy:
1. Standard Delivery across all Indian pin codes is completed in 2 to 4 business days.
2. Express Metro Delivery (Delhi-NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad) is delivered in 24 to 48 hours.
3. Free Delivery applies on all orders above ₹499. For orders below ₹499, a nominal shipping fee of ₹40 is charged.
4. Real-time SMS and WhatsApp tracking updates are dispatched immediately upon courier handoff.`
  },
  {
    id: 'doc-005',
    type: 'payment_faq',
    title: 'Accepted Payment Methods and Security',
    language: 'en',
    version: '1.5',
    active: true,
    updated_at: '2026-09-01T00:00:00Z',
    content: `Payment Options at BharatShop:
1. UPI (Unified Payments Interface): Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.
2. Debit & Credit Cards: RuPay, Visa, MasterCard, and American Express.
3. Cash on Delivery (COD): Available for orders up to ₹10,000 across 19,000+ Indian pincodes.
4. EMI: No-Cost EMI available on selected credit cards and Bajaj Finserv EMI Network Cards for purchases above ₹3,000.
5. All transactions are 256-bit encrypted. BharatShop AI never asks for or stores sensitive PINs, CVVs, or OTPs.`
  },
  {
    id: 'doc-006',
    type: 'cod_info',
    title: 'Cash on Delivery (COD) Guidelines',
    language: 'en',
    version: '1.1',
    active: true,
    updated_at: '2026-09-01T00:00:00Z',
    content: `Cash on Delivery (COD) Rules:
1. COD is valid for orders up to ₹10,000.
2. An OTP verification is required at the time of delivery before handing cash to the delivery executive.
3. Digital payments upon doorstep arrival (QR code scan via PhonePe/GPay) are also accepted by all partner couriers.`
  }
];
