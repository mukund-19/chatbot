import { Product } from '../../src/types/index';

export const SEED_PRODUCTS: Product[] = [
  // ==========================================
  // 1. MOBILE PHONES (30 products)
  // ==========================================
  {
    id: 'prod-mob-001',
    sku: 'BHARAT-MOB-001',
    name: 'OnePlus Nord CE4 5G (Dark Chrome, 8GB RAM, 128GB Storage)',
    brand: 'OnePlus',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Equipped with Qualcomm Snapdragon 7 Gen 3, 100W SUPERVOOC charging, and 50MP Sony LYT-600 OIS camera with 5500mAh battery for all-day heavy usage.',
    price: 24999,
    original_price: 26999,
    currency: 'INR',
    rating: 4.5,
    review_count: 14200,
    stock_qty: 48,
    color_options: ['Dark Chrome', 'Celadon Marble'],
    size_options: ['8GB+128GB', '8GB+256GB'],
    specifications: {
      RAM: '8GB LPDDR4X',
      Storage: '128GB UFS 3.1',
      Battery: '5500 mAh (100W Fast Charge)',
      Camera: '50MP Sony LYT-600 OIS + 8MP Ultra-Wide',
      Processor: 'Snapdragon 7 Gen 3',
      Display: '6.7-inch 120Hz AMOLED FHD+',
      Network: '5G Dual SIM',
      Warranty: '1 Year Manufacturer'
    },
    tags: ['phone', 'oneplus', '5g', 'fast charging', 'amoled', 'camera', 'under 25k', 'under 30k'],
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    seller: 'OnePlus Authorized Retail India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-mob-002',
    sku: 'BHARAT-MOB-002',
    name: 'Samsung Galaxy M34 5G (Prism Silver, 6GB RAM, 128GB Storage)',
    brand: 'Samsung',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Massive 6000mAh battery with 120Hz sAMOLED display and 50MP No Shake Cam (OIS) with 4 generations of OS upgrades.',
    price: 15999,
    original_price: 24499,
    currency: 'INR',
    rating: 4.2,
    review_count: 28400,
    stock_qty: 65,
    color_options: ['Prism Silver', 'Midnight Blue', 'Waterfall Blue'],
    size_options: ['6GB+128GB', '8GB+128GB'],
    specifications: {
      RAM: '6GB',
      Storage: '128GB (Expandable up to 1TB)',
      Battery: '6000 mAh Monster Battery',
      Camera: '50MP Triple Cam with OIS',
      Processor: 'Exynos 1280 5nm Octa-Core',
      Display: '6.5-inch Super AMOLED 120Hz',
      Network: '5G 12 Bands',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['samsung', 'phone', 'big battery', 'samoled', 'under 20k', 'budget 5g', 'under 16k'],
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    seller: 'Samsung India Direct',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-mob-003',
    sku: 'BHARAT-MOB-003',
    name: 'Realme 12 Pro+ 5G (Submarine Blue, 8GB RAM, 256GB Storage)',
    brand: 'Realme',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Flagship periscope telephoto portrait camera with luxury watch design by Ollivier Saveo, Snapdragon 7s Gen 2 and 120Hz curved vision display.',
    price: 29999,
    original_price: 34999,
    currency: 'INR',
    rating: 4.4,
    review_count: 8900,
    stock_qty: 32,
    color_options: ['Submarine Blue', 'Navigator Beige'],
    size_options: ['8GB+256GB', '12GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '256GB',
      Battery: '5000 mAh (67W SUPERVOOC)',
      Camera: '64MP Periscope OIS + 50MP Sony IMX890 OIS + 8MP Ultra-Wide',
      Processor: 'Snapdragon 7s Gen 2',
      Display: '6.7-inch 120Hz Curved OLED',
      Network: '5G',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['realme', 'camera phone', 'periscope zoom', 'under 30k', 'curved display', 'portrait'],
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    seller: 'Realme Official Store',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-mob-004',
    sku: 'BHARAT-MOB-004',
    name: 'Redmi Note 13 Pro 5G (Midnight Black, 8GB RAM, 128GB Storage)',
    brand: 'Xiaomi',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Ultra-clear 200MP camera with OIS, 1.5K 120Hz AMOLED display with Corning Gorilla Glass Victus, and 67W turbo charge.',
    price: 25999,
    original_price: 28999,
    currency: 'INR',
    rating: 4.3,
    review_count: 11400,
    stock_qty: 40,
    color_options: ['Midnight Black', 'Coral Purple', 'Arctic White'],
    size_options: ['8GB+128GB', '8GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5100 mAh (67W Turbo Charge)',
      Camera: '200MP Ultra-High Res OIS + 8MP Ultra-Wide + 2MP Macro',
      Processor: 'Snapdragon 7s Gen 2',
      Display: '6.67-inch 1.5K AMOLED 120Hz',
      Network: '5G Dual Standby',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['redmi', 'xiaomi', '200mp', 'camera phone', 'under 30k', '5g phone'],
    image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    seller: 'Xiaomi India E-Hub',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-mob-005',
    sku: 'BHARAT-MOB-005',
    name: 'Apple iPhone 15 (Blue, 128 GB)',
    brand: 'Apple',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Dynamic Island, 48MP main camera with 2x Telephoto, A16 Bionic chip, durable color-infused glass and aluminum design with USB-C.',
    price: 69999,
    original_price: 79900,
    currency: 'INR',
    rating: 4.7,
    review_count: 32000,
    stock_qty: 25,
    color_options: ['Blue', 'Black', 'Pink', 'Green', 'Yellow'],
    size_options: ['128GB', '256GB', '512GB'],
    specifications: {
      RAM: '6GB',
      Storage: '128GB',
      Battery: 'All-day battery life (Up to 20 hours video playback)',
      Camera: '48MP Main + 12MP Ultra Wide + 12MP TrueDepth Front',
      Processor: 'A16 Bionic Chip',
      Display: '6.1-inch Super Retina XDR Display',
      Network: '5G with eSIM',
      Warranty: '1 Year Apple India Warranty'
    },
    tags: ['apple', 'iphone', 'premium phone', 'dynamic island', 'flagship', '48mp', 'ios'],
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    seller: 'Apple Authorized Reseller India',
    delivery_days: 1,
    active: true
  },
  {
    id: 'prod-mob-006',
    sku: 'BHARAT-MOB-006',
    name: 'Motorola Edge 50 Fusion (Marshmallow Blue, 8GB RAM, 128GB Storage)',
    brand: 'Motorola',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Segment-best 50MP Sony LYTIA 700C OIS camera, IP68 underwater protection, 144Hz curved pOLED display and clean Hello UI.',
    price: 22999,
    original_price: 25999,
    currency: 'INR',
    rating: 4.5,
    review_count: 7800,
    stock_qty: 35,
    color_options: ['Marshmallow Blue', 'Hot Pink', 'Forest Blue'],
    size_options: ['8GB+128GB', '12GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5000 mAh (68W TurboPower)',
      Camera: '50MP Sony LYTIA 700C OIS + 13MP Ultrawide/Macro',
      Processor: 'Snapdragon 7s Gen 2',
      Display: '6.7-inch 144Hz Curved pOLED',
      Network: '5G',
      WaterResistance: 'IP68 Underwater Protection'
    },
    tags: ['motorola', 'moto edge', 'curved screen', 'ip68', 'under 25k', 'under 30k', 'clean android'],
    image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    seller: 'Motorola Direct Online',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-mob-007',
    sku: 'BHARAT-MOB-007',
    name: 'iQOO Z9s 5G (Onyx Green, 8GB RAM, 128GB Storage)',
    brand: 'iQOO',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'MediaTek Dimensity 7300, 50MP Sony IMX882 OIS camera, 5500mAh ultra-slim battery, and 120Hz 3D curved AMOLED display for mobile gamers.',
    price: 19999,
    original_price: 23999,
    currency: 'INR',
    rating: 4.4,
    review_count: 5300,
    stock_qty: 44,
    color_options: ['Onyx Green', 'Titanium Matte'],
    size_options: ['8GB+128GB', '8GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5500 mAh (44W FlashCharge)',
      Camera: '50MP Sony OIS + 2MP Bokeh',
      Processor: 'MediaTek Dimensity 7300 Energy 4nm',
      Display: '6.77-inch 120Hz 3D Curved AMOLED',
      Network: '5G',
      Warranty: '1 Year Warranty'
    },
    tags: ['iqoo', 'gaming phone', 'under 20k', 'dimensity 7300', 'curved amoled', 'fast battery'],
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    seller: 'iQOO India Mobiles',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-mob-008',
    sku: 'BHARAT-MOB-008',
    name: 'POCO X6 Neo 5G (Astral Black, 8GB RAM, 128GB Storage)',
    brand: 'POCO',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Sleek 7.69mm thin bezel design, 108MP AI dual camera, 120Hz AMOLED display with 1000 nits peak brightness and Dimensity 6080 5G processor.',
    price: 13999,
    original_price: 19999,
    currency: 'INR',
    rating: 4.2,
    review_count: 18200,
    stock_qty: 70,
    color_options: ['Astral Black', 'Horizon Blue', 'Martian Orange'],
    size_options: ['8GB+128GB', '12GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5000 mAh (33W Fast Charge)',
      Camera: '108MP Main + 2MP Depth',
      Processor: 'MediaTek Dimensity 6080 5G',
      Display: '6.67-inch 120Hz AMOLED Bezelless',
      Network: '5G Dual SIM',
      Warranty: '1 Year'
    },
    tags: ['poco', 'budget 5g', 'under 15k', '108mp', 'thin bezel', 'amoled'],
    image_url: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=80',
    seller: 'POCO Official India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-mob-009',
    sku: 'BHARAT-MOB-009',
    name: 'Samsung Galaxy S24 5G (Onyx Black, 8GB RAM, 256GB Storage)',
    brand: 'Samsung',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Galaxy AI smartphone with Circle to Search, Live Translate, Note Assist, 50MP ProVisual Engine and Dynamic AMOLED 2X 120Hz display.',
    price: 64999,
    original_price: 79999,
    currency: 'INR',
    rating: 4.6,
    review_count: 6700,
    stock_qty: 20,
    color_options: ['Onyx Black', 'Marble Gray', 'Cobalt Violet'],
    size_options: ['8GB+128GB', '8GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '256GB',
      Battery: '4000 mAh (25W Fast Charge + Wireless)',
      Camera: '50MP Wide + 10MP Telephoto 3x + 12MP Ultra-Wide',
      Processor: 'Exynos 2400 Deca-Core',
      Display: '6.2-inch Dynamic AMOLED 2X FHD+ 1-120Hz',
      Network: '5G with Dual eSIM',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['samsung', 'galaxy s24', 'flagship', 'ai phone', 'compact flagship', 'best camera'],
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    seller: 'Samsung Brand Store',
    delivery_days: 1,
    active: true
  },
  {
    id: 'prod-mob-010',
    sku: 'BHARAT-MOB-010',
    name: 'Nothing Phone (2a) 5G (Black, 8GB RAM, 128GB Storage)',
    brand: 'Nothing',
    category: 'Mobile Phones',
    subcategory: 'Smartphones',
    description: 'Iconic transparent design with Glyph Interface, custom MediaTek Dimensity 7200 Pro, 50MP dual studio cameras and clean Nothing OS 2.5.',
    price: 23999,
    original_price: 25999,
    currency: 'INR',
    rating: 4.4,
    review_count: 9800,
    stock_qty: 36,
    color_options: ['Black', 'White', 'Special Edition'],
    size_options: ['8GB+128GB', '8GB+256GB'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5000 mAh (45W Fast Charging)',
      Camera: '50MP OIS + 50MP Ultra-Wide',
      Processor: 'MediaTek Dimensity 7200 Pro',
      Display: '6.7-inch 120Hz Flexible AMOLED',
      Network: '5G',
      Glyph: '3 Glyph light zones'
    },
    tags: ['nothing', 'phone 2a', 'glyph', 'clean software', 'under 25k', 'under 30k', 'unique design'],
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    seller: 'Nothing Technology India',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 2. LAPTOPS (20 products)
  // ==========================================
  {
    id: 'prod-lap-001',
    sku: 'BHARAT-LAP-001',
    name: 'Apple MacBook Air M2 (13.6-inch, 8GB Unified Memory, 256GB SSD, Midnight)',
    brand: 'Apple',
    category: 'Laptops',
    subcategory: 'Ultrabooks',
    description: 'Supercharged by the next-generation M2 chip, incredibly thin aluminum unibody, up to 18 hours of battery life and Liquid Retina display.',
    price: 84990,
    original_price: 99900,
    currency: 'INR',
    rating: 4.8,
    review_count: 14500,
    stock_qty: 18,
    color_options: ['Midnight', 'Starlight', 'Space Grey', 'Silver'],
    size_options: ['8GB+256GB', '16GB+512GB'],
    specifications: {
      Processor: 'Apple M2 8-core CPU 8-core GPU',
      RAM: '8GB Unified Memory',
      Storage: '256GB Superfast SSD',
      Display: '13.6-inch Liquid Retina Display with True Tone',
      Battery: 'Up to 18 hours battery life',
      Weight: '1.24 kg',
      OS: 'macOS Sonoma',
      Warranty: '1 Year Apple Warranty'
    },
    tags: ['laptop', 'macbook', 'apple', 'm2', 'ultrabook', 'student laptop', 'long battery'],
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    seller: 'Apple India Direct',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-lap-002',
    sku: 'BHARAT-LAP-002',
    name: 'ASUS Vivobook 15 (12th Gen Intel Core i3-1215U, 8GB RAM, 512GB SSD, Quiet Blue)',
    brand: 'ASUS',
    category: 'Laptops',
    subcategory: 'Everyday Laptops',
    description: 'Thin and light laptop with 15.6-inch FHD anti-glare display, Windows 11 Home, MS Office Home & Student 2021 and fingerprint scanner.',
    price: 34990,
    original_price: 49990,
    currency: 'INR',
    rating: 4.3,
    review_count: 19800,
    stock_qty: 45,
    color_options: ['Quiet Blue', 'Transparent Silver'],
    size_options: ['8GB+512GB', '16GB+512GB'],
    specifications: {
      Processor: 'Intel Core i3-1215U (6 Cores, up to 4.4 GHz)',
      RAM: '8GB DDR4 (Upgradable to 16GB)',
      Storage: '512GB M.2 NVMe PCIe SSD',
      Display: '15.6-inch FHD (1920 x 1080) 60Hz Anti-Glare',
      Battery: '42WHrs (Up to 6 hours)',
      Weight: '1.7 kg',
      OS: 'Windows 11 Home + MS Office 2021',
      Warranty: '1 Year Onsite'
    },
    tags: ['asus', 'budget laptop', 'student laptop', 'under 40k', 'intel i3', 'ssd'],
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    seller: 'ASUS India Retail Hub',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-lap-003',
    sku: 'BHARAT-LAP-003',
    name: 'HP Pavilion 14 (13th Gen Intel Core i5-1335U, 16GB RAM, 512GB SSD, Natural Silver)',
    brand: 'HP',
    category: 'Laptops',
    subcategory: 'Performance Laptops',
    description: 'Micro-edge FHD IPS display, Intel Iris Xe graphics, audio by B&O, backlit keyboard, fast charge and HP Wide Vision 720p HD camera.',
    price: 59990,
    original_price: 74990,
    currency: 'INR',
    rating: 4.4,
    review_count: 8200,
    stock_qty: 24,
    color_options: ['Natural Silver', 'Warm Gold'],
    size_options: ['16GB+512GB', '16GB+1TB'],
    specifications: {
      Processor: 'Intel Core i5-1335U (10 Cores, up to 4.6 GHz)',
      RAM: '16GB DDR4-3200 MHz',
      Storage: '512GB PCIe NVMe M.2 SSD',
      Display: '14-inch diagonal FHD IPS micro-edge display',
      Battery: 'Up to 9 hours with HP Fast Charge',
      Weight: '1.41 kg',
      OS: 'Windows 11 Home + Office Home & Student 2021',
      Warranty: '1 Year HP Onsite'
    },
    tags: ['hp', 'laptop', 'intel i5', '16gb ram', 'under 60k', 'business laptop', 'lightweight'],
    image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
    seller: 'HP World Official Online',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-lap-004',
    sku: 'BHARAT-LAP-004',
    name: 'Lenovo IdeaPad Gaming 3 (AMD Ryzen 5 5500H, 16GB RAM, 512GB SSD, RTX 2050 4GB)',
    brand: 'Lenovo',
    category: 'Laptops',
    subcategory: 'Gaming Laptops',
    description: 'Engineered for competitive esports and creative workloads with 120Hz IPS display, military-grade MIL-STD-810H durability, and Nahimic 3D Audio.',
    price: 47990,
    original_price: 66990,
    currency: 'INR',
    rating: 4.3,
    review_count: 12100,
    stock_qty: 30,
    color_options: ['Shadow Black'],
    size_options: ['16GB+512GB'],
    specifications: {
      Processor: 'AMD Ryzen 5 5500H (4 Cores, 8 Threads)',
      Graphics: 'NVIDIA GeForce RTX 2050 4GB GDDR6',
      RAM: '16GB DDR4 (Upgradable to 32GB)',
      Storage: '512GB SSD M.2 PCIe',
      Display: '15.6-inch FHD (1920x1080) 120Hz IPS 250nits',
      OS: 'Windows 11 Home',
      Warranty: '1 Year Lenovo Onsite + 3 Months Game Pass'
    },
    tags: ['lenovo', 'gaming laptop', 'rtx 2050', 'ryzen 5', 'under 50k', 'high refresh rate'],
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    seller: 'Lenovo India Gaming Store',
    delivery_days: 3,
    active: true
  },

  // ==========================================
  // 3. AUDIO & HEADPHONES (20 products)
  // ==========================================
  {
    id: 'prod-aud-001',
    sku: 'BHARAT-AUD-001',
    name: 'boAt Nirvana Ion ANC Truly Wireless Earbuds (Charcoal Black)',
    brand: 'boAt',
    category: 'Headphones',
    subcategory: 'TWS Earbuds',
    description: 'Active Noise Cancellation up to 32dB, massive 120 hours total playback, Crystal Bionic Sound powered by HiFi DSP, dual EQ modes and quad mics with ENx tech.',
    price: 2499,
    original_price: 9990,
    currency: 'INR',
    rating: 4.3,
    review_count: 34000,
    stock_qty: 120,
    color_options: ['Charcoal Black', 'Crystal White'],
    size_options: ['Standard'],
    specifications: {
      Playback: 'Up to 120 Hours Total (24H Earbuds)',
      NoiseCancellation: 'Active Noise Cancellation up to 32dB',
      Drivers: '10mm Dual Drivers with HiFi DSP',
      Microphone: 'Quad Mics with ENx Noise Isolation',
      WaterResistance: 'IPX4 Water & Sweat Resistant',
      Connectivity: 'Bluetooth v5.2 with In-Ear Detection',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['boat', 'earbuds', 'anc', 'long battery', 'under 3000', 'under 2500', 'tws', 'wireless'],
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    seller: 'boAt Lifestyle India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-aud-002',
    sku: 'BHARAT-AUD-002',
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones (Silver)',
    brand: 'Sony',
    category: 'Headphones',
    subcategory: 'Over-Ear Headphones',
    description: 'Industry-leading noise cancellation with two processors and 8 microphones, Auto NC Optimizer, crystal clear hands-free calling, up to 30 hours battery life.',
    price: 28990,
    original_price: 34990,
    currency: 'INR',
    rating: 4.7,
    review_count: 9200,
    stock_qty: 15,
    color_options: ['Silver', 'Black', 'Midnight Blue'],
    size_options: ['Standard'],
    specifications: {
      Battery: 'Up to 30 Hours with NC On (3 min charge = 3 hours)',
      NoiseCancellation: 'Integrated Processor V1 + HD QN1',
      Microphones: '4 beamforming microphones with AI voice reduction',
      AudioCodec: 'LDAC, AAC, SBC (Hi-Res Wireless)',
      Weight: '250 grams ultra-comfortable fit',
      Warranty: '1 Year Sony India Warranty'
    },
    tags: ['sony', 'anc', 'headphones', 'premium audio', 'wireless', 'over ear', 'best sound'],
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    seller: 'Sony India Center',
    delivery_days: 1,
    active: true
  },
  {
    id: 'prod-aud-003',
    sku: 'BHARAT-AUD-003',
    name: 'Realme Buds Air 5 Pro (Sunrise Beige)',
    brand: 'Realme',
    category: 'Headphones',
    subcategory: 'TWS Earbuds',
    description: '50dB Active Noise Cancellation, coaxial dual drivers (11mm bass + 6mm micro-planar tweeter), LDAC Hi-Res Audio certification, 40 hours total battery.',
    price: 4999,
    original_price: 7999,
    currency: 'INR',
    rating: 4.5,
    review_count: 11200,
    stock_qty: 60,
    color_options: ['Sunrise Beige', 'Astral Black'],
    size_options: ['Standard'],
    specifications: {
      ANC: '50dB Active Noise Cancellation 4000Hz Ultra-wide band',
      Drivers: 'Coaxial Dual Drivers (11mm + 6mm planar)',
      AudioQuality: 'Hi-Res Certified with LDAC support',
      Battery: '40 Hours Playback (Dart Charge 10 min = 7 hours)',
      Latency: '40ms Super Low Latency Game Mode',
      Warranty: '1 Year Warranty'
    },
    tags: ['realme', 'earbuds', '50db anc', 'hi-res', 'ldac', 'under 5000', 'best tws'],
    image_url: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80',
    seller: 'Realme Accessories Hub',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-aud-004',
    sku: 'BHARAT-AUD-004',
    name: 'OnePlus Bullets Wireless Z2 (Magico Black)',
    brand: 'OnePlus',
    category: 'Headphones',
    subcategory: 'Neckbands',
    description: 'Bombastic bass with 12.4mm dynamic drivers, anti-distortion audio technology, 30 hours battery life with 10 minutes Warp Charge giving 20 hours music.',
    price: 1599,
    original_price: 2299,
    currency: 'INR',
    rating: 4.3,
    review_count: 58000,
    stock_qty: 95,
    color_options: ['Magico Black', 'Acoustic Red', 'Beam Blue'],
    size_options: ['Standard'],
    specifications: {
      Battery: '30 Hours Playback (10 min charge = 20 hours)',
      Driver: '12.4mm Dynamic Bass Drivers',
      WaterResistance: 'IP55 Water and Sweat Resistance',
      Connectivity: 'Bluetooth v5.0 with Magnetic Pause/Play',
      Warranty: '1 Year Replacement Warranty'
    },
    tags: ['oneplus', 'neckband', 'wireless earphones', 'deep bass', 'warp charge', 'under 2000'],
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    seller: 'OnePlus Official',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 4. SMARTWATCHES (15 products)
  // ==========================================
  {
    id: 'prod-wat-001',
    sku: 'BHARAT-WAT-001',
    name: 'Noise ColorFit Pro 5 Max (Jet Black, 1.96-inch AMOLED)',
    brand: 'Noise',
    category: 'Smartwatches',
    subcategory: 'Bluetooth Calling Watches',
    description: 'Post-training recovery analysis with VO2 max, 1.96-inch AMOLED display with Always-On feature, Tru Sync Bluetooth calling with SOS and 100+ sports modes.',
    price: 3999,
    original_price: 9999,
    currency: 'INR',
    rating: 4.3,
    review_count: 17500,
    stock_qty: 55,
    color_options: ['Jet Black', 'Space Blue', 'Rose Gold'],
    size_options: ['Standard Strap (22mm)'],
    specifications: {
      Display: '1.96-inch AMOLED (410 x 502 px, Always On)',
      Calling: 'Tru Sync Bluetooth Calling with dial pad & mic',
      Health: '24x7 Heart Rate, SpO2, Stress, Sleep & VO2 Max',
      Battery: 'Up to 7 Days typical use',
      WaterResistance: 'IP68 Water Resistance',
      Warranty: '1 Year Warranty'
    },
    tags: ['noise', 'smartwatch', 'amoled watch', 'calling watch', 'fitness tracker', 'under 4000'],
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    seller: 'Noise Official Brand Store',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-wat-002',
    sku: 'BHARAT-WAT-002',
    name: 'Samsung Galaxy Watch6 Bluetooth (40mm, Graphite)',
    brand: 'Samsung',
    category: 'Smartwatches',
    subcategory: 'WearOS Watches',
    description: 'Advanced sleep coaching, personalized heart rate zones, ECG and blood pressure monitoring, Sapphire crystal glass and Wear OS powered by Samsung.',
    price: 18999,
    original_price: 29999,
    currency: 'INR',
    rating: 4.6,
    review_count: 5400,
    stock_qty: 22,
    color_options: ['Graphite', 'Gold', 'Silver'],
    size_options: ['40mm', '44mm'],
    specifications: {
      Display: '1.3-inch Super AMOLED Sapphire Crystal',
      OS: 'Wear OS 4 Powered by Samsung',
      Processor: 'Exynos W930 Dual Core 1.4GHz',
      HealthSensors: 'BioActive Sensor (Optical Heart + ECG + BIA Body Composition)',
      Battery: '300 mAh with WPC Fast Wireless Charging',
      WaterResistance: '5ATM + IP68 Water and Dust Resistance',
      Warranty: '1 Year Brand Warranty'
    },
    tags: ['samsung', 'galaxy watch', 'smartwatch', 'wear os', 'ecg', 'premium watch', 'fitness'],
    image_url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    seller: 'Samsung India Direct',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 5. SAREES & ETHNIC WEAR (25 products)
  // ==========================================
  {
    id: 'prod-sar-001',
    sku: 'BHARAT-SAR-001',
    name: 'Kanjivaram Soft Silk Saree with Rich Zari Pallu (Royal Red & Gold)',
    brand: 'Banarasi Heritage',
    category: 'Sarees',
    subcategory: 'Silk Sarees',
    description: 'Exquisite bridal and festive soft silk saree woven with traditional temple zari border, intricate gold floral motifs and contrast heavy brocade unstitched blouse piece.',
    price: 1899,
    original_price: 4999,
    currency: 'INR',
    rating: 4.6,
    review_count: 12400,
    stock_qty: 85,
    color_options: ['Royal Red', 'Emerald Green', 'Maroon', 'Peacock Blue'],
    size_options: ['Free Size (5.5m Saree + 0.8m Blouse)'],
    specifications: {
      Fabric: 'Litchi Soft Silk with Gold Zari Weave',
      SareeLength: '5.5 Meters',
      BlousePiece: '0.8 Meter Running Unstitched Contrast Blouse',
      Occasion: 'Wedding, Festive, Diwali, Karwa Chauth, Puja',
      Work: 'Jacquard Woven Traditional Temple Motifs',
      WashCare: 'Dry Clean Recommended'
    },
    tags: ['saree', 'red saree', 'silk saree', 'kanjivaram', 'diwali', 'wedding saree', 'under 2000', 'festive wear'],
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    seller: 'Varanasi Weavers Cooperative',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-sar-002',
    sku: 'BHARAT-SAR-002',
    name: 'Banarasi Art Silk Woven Saree (Crimson Red with Muted Gold Border)',
    brand: 'Suta Silks',
    category: 'Sarees',
    subcategory: 'Art Silk Sarees',
    description: 'Graceful Banarasi design featuring delicate golden meenakari motifs across the drape, elegant tassels on the pallu and comfortable all-day festive drape.',
    price: 1499,
    original_price: 3499,
    currency: 'INR',
    rating: 4.4,
    review_count: 9800,
    stock_qty: 60,
    color_options: ['Crimson Red', 'Mustard Yellow', 'Wine'],
    size_options: ['Free Size'],
    specifications: {
      Fabric: 'Art Silk with Metallic Zari',
      SareeLength: '5.5 Meters + 0.8m Blouse',
      BlousePiece: 'Included unstitched',
      Occasion: 'Diwali, Navratri, Family Gatherings',
      WashCare: 'Machine wash gentle or dry clean'
    },
    tags: ['saree', 'red saree', 'banarasi', 'diwali', 'festive', 'under 2000', 'under 1500', 'budget saree'],
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    seller: 'Surat Handlooms Direct',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-sar-003',
    sku: 'BHARAT-SAR-003',
    name: 'Pure Chanderi Cotton Silk Floral Saree (Pastel Sage Green)',
    brand: 'FabCraft India',
    category: 'Sarees',
    subcategory: 'Cotton Sarees',
    description: 'Lightweight breathable Chanderi saree woven with zari border and delicate hand-block printed botanical elements, ideal for daytime events and office celebrations.',
    price: 1299,
    original_price: 2499,
    currency: 'INR',
    rating: 4.5,
    review_count: 4500,
    stock_qty: 40,
    color_options: ['Pastel Sage Green', 'Blush Pink', 'Ivory'],
    size_options: ['Free Size'],
    specifications: {
      Fabric: 'Chanderi Cotton Silk Blend',
      Length: '6.3 Meters with Blouse Piece',
      Occasion: 'Daily Wear, Festive, Office Event',
      WashCare: 'Hand Wash Cold'
    },
    tags: ['saree', 'cotton saree', 'chanderi', 'summer wear', 'office wear', 'under 1500'],
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    seller: 'Madhya Pradesh Handlooms',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-sar-004',
    sku: 'BHARAT-SAR-004',
    name: 'Georgette Bandhani Printed Saree with Gota Patti Lace Border (Scarlet Red)',
    brand: 'Rajasthani Rang',
    category: 'Sarees',
    subcategory: 'Georgette Sarees',
    description: 'Traditional Jaipur Bandhej tie-and-dye printed saree finished with rich golden gota patti border work. Extremely lightweight, flowy and easy to pleat.',
    price: 999,
    original_price: 2199,
    currency: 'INR',
    rating: 4.3,
    review_count: 8200,
    stock_qty: 90,
    color_options: ['Scarlet Red', 'Rani Pink', 'Marigold Yellow'],
    size_options: ['Free Size'],
    specifications: {
      Fabric: 'Pure Poly Georgette',
      Length: '5.5 Meters + 0.8m Blouse',
      Border: 'Golden Gota Patti Lace',
      Occasion: 'Festive, Karwa Chauth, Diwali Puja',
      WashCare: 'Dry Clean or Gentle Hand Wash'
    },
    tags: ['saree', 'red saree', 'bandhani', 'georgette', 'under 1000', 'diwali saree', 'gota patti'],
    image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    seller: 'Jaipur Crafts Hub',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 6. KURTIS & WOMEN'S ETHNIC (20 products)
  // ==========================================
  {
    id: 'prod-kur-001',
    sku: 'BHARAT-KUR-001',
    name: 'Libas Pure Cotton Embroidered Anarkali Kurta with Pant and Dupatta Set (Indigo Blue)',
    brand: 'Libas',
    category: 'Kurtis',
    subcategory: 'Kurta Sets',
    description: 'Handcrafted floral embroidery on yoke, breathable pure cotton fabric with matching flared Anarkali silhouette, straight trousers and printed chiffon dupatta.',
    price: 1799,
    original_price: 3999,
    currency: 'INR',
    rating: 4.5,
    review_count: 14800,
    stock_qty: 65,
    color_options: ['Indigo Blue', 'Teal Green', 'Mustard'],
    size_options: ['S', 'M', 'L', 'XL', 'XXL'],
    specifications: {
      Fabric: '100% Cotton',
      KurtaType: 'Anarkali Flared with Yoke Embroidery',
      BottomType: 'Straight fit cotton trousers with elasticated waistband',
      Dupatta: '2.25m Chiffon Printed Dupatta',
      Sleeve: 'Three-Quarter Sleeves',
      WashCare: 'Hand Wash separately'
    },
    tags: ['libas', 'kurti set', 'anarkali', 'cotton kurta', 'festive wear', 'ethnic set', 'under 2000'],
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    seller: 'Libas Official Store India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-kur-002',
    sku: 'BHARAT-KUR-002',
    name: 'Biba Festive Straight Chanderi Silk Kurta with Gold Foil Print (Wine Red)',
    brand: 'Biba',
    category: 'Kurtis',
    subcategory: 'Straight Kurtis',
    description: 'Sophisticated festive kurta with mandarin collar, delicate zari neck placket, gold foil motifs and comfortable inner lining for all evening functions.',
    price: 1999,
    original_price: 3599,
    currency: 'INR',
    rating: 4.6,
    review_count: 8300,
    stock_qty: 42,
    color_options: ['Wine Red', 'Emerald Green', 'Midnight Navy'],
    size_options: ['32', '34', '36', '38', '40'],
    specifications: {
      Fabric: 'Chanderi Silk with Santoon Lining',
      Length: 'Calf Length Straight Kurta',
      Neckline: 'Mandarin Collar with Zari Placket',
      Occasion: 'Diwali, Parties, Festive Celebrations',
      WashCare: 'Dry Clean Only'
    },
    tags: ['biba', 'kurti', 'straight kurta', 'festive', 'chanderi silk', 'under 2000', 'red kurti'],
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    seller: 'Biba Apparels Direct',
    delivery_days: 3,
    active: true
  },

  // ==========================================
  // 7. MEN'S WEAR (20 products)
  // ==========================================
  {
    id: 'prod-men-001',
    sku: 'BHARAT-MEN-001',
    name: 'Manyavar Royal Jacquard Silk Blend Kurta Pajama Set (Maroon & Cream)',
    brand: 'Manyavar',
    category: "Men's Clothing",
    subcategory: 'Ethnic Wear',
    description: 'Impeccable festive mandarin collar kurta with intricate self-woven jacquard patterns paired with a classic churidar pajama for grand Indian celebrations.',
    price: 3499,
    original_price: 4999,
    currency: 'INR',
    rating: 4.6,
    review_count: 7200,
    stock_qty: 38,
    color_options: ['Maroon', 'Midnight Blue', 'Mustard Gold'],
    size_options: ['S', 'M', 'L', 'XL', 'XXL'],
    specifications: {
      KurtaFabric: 'Jacquard Silk Blend',
      PajamaFabric: 'Cotton Blend Churidar with drawstring',
      Collar: 'Mandarin Bandhgala Collar with metallic buttons',
      Fit: 'Tailored Regular Fit',
      Occasion: 'Diwali, Sangeet, Wedding, Puja',
      WashCare: 'Dry Clean Recommended'
    },
    tags: ['manyavar', 'kurta pajama', 'mens ethnic', 'diwali', 'wedding kurta', 'traditional'],
    image_url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80',
    seller: 'Manyavar Official Store',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-men-002',
    sku: 'BHARAT-MEN-002',
    name: "Levi's Men 511 Slim Fit Stretch Denim Jeans (Dark Indigo)",
    brand: "Levi's",
    category: "Men's Clothing",
    subcategory: 'Jeans',
    description: 'A modern slim with room to move. Added stretch for all-day comfort, classic 5-pocket styling and signature red tab leather patch.',
    price: 2499,
    original_price: 3999,
    currency: 'INR',
    rating: 4.4,
    review_count: 22000,
    stock_qty: 60,
    color_options: ['Dark Indigo', 'Light Stonewash', 'Jet Black'],
    size_options: ['30', '32', '34', '36', '38'],
    specifications: {
      Material: '99% Cotton, 1% Elastane',
      Fit: 'Slim from hip to ankle',
      Rise: 'Mid Rise',
      Fly: 'Zip Fly with button closure',
      WashCare: 'Machine Wash Cold Inside Out'
    },
    tags: ['levis', 'jeans', 'mens clothing', 'slim fit', 'denim', 'casual wear', 'under 2500'],
    image_url: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80',
    seller: 'Levi Strauss India Retail',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 8. FOOTWEAR & SHOES (15 products)
  // ==========================================
  {
    id: 'prod-sho-001',
    sku: 'BHARAT-SHO-001',
    name: 'Red Tape Men Casual Sneaker with Memory Foam Insole (White & Navy)',
    brand: 'Red Tape',
    category: 'Shoes',
    subcategory: 'Sneakers',
    description: 'Premium PU leather upper with cushioned memory foam comfort insole, anti-slip EVA sole and classic streetwear silhouette for all-day walking.',
    price: 1599,
    original_price: 5299,
    currency: 'INR',
    rating: 4.3,
    review_count: 28900,
    stock_qty: 80,
    color_options: ['White & Navy', 'White & Green', 'All Black'],
    size_options: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    specifications: {
      UpperMaterial: 'Premium Synthetic PU Leather',
      SoleMaterial: 'TPR / EVA Non-Skid Outsole',
      Insole: 'Soft Memory Foam Cushioning',
      Closure: 'Lace-Up',
      Warranty: '90 Days Manufacturer Warranty'
    },
    tags: ['shoes', 'sneakers', 'white sneakers', 'red tape', 'casual shoes', 'size 9', 'under 2000'],
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    seller: 'Red Tape Footwear Direct',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-sho-002',
    sku: 'BHARAT-SHO-002',
    name: 'Puma Smash V2 Leather Unisex Sneakers (Puma White-Black)',
    brand: 'Puma',
    category: 'Shoes',
    subcategory: 'Sneakers',
    description: 'Tennis-inspired silhouette with clean soft leather upper, SoftFoam+ comfort sockliner for instant step-in comfort and durable rubber outsole.',
    price: 2699,
    original_price: 4499,
    currency: 'INR',
    rating: 4.5,
    review_count: 19400,
    stock_qty: 45,
    color_options: ['White-Black', 'Triple White', 'Black-White'],
    size_options: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: {
      Material: 'Soft Natural Leather Upper',
      Footbed: 'SoftFoam+ dual-density insole',
      Sole: 'Clean Non-marking Rubber Outsole',
      Fit: 'Regular Fit',
      Warranty: '3 Months Brand Warranty'
    },
    tags: ['puma', 'sneakers', 'shoes', 'leather shoes', 'size 9', 'under 3000', 'sports casual'],
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    seller: 'Puma Sports India Store',
    delivery_days: 1,
    active: true
  },

  // ==========================================
  // 9. BEAUTY & SKINCARE (20 products)
  // ==========================================
  {
    id: 'prod-bea-001',
    sku: 'BHARAT-BEA-001',
    name: 'Mamaearth Vitamin C Daily Glow Face Serum with Turmeric for Radiance (30ml)',
    brand: 'Mamaearth',
    category: 'Skincare',
    subcategory: 'Serums',
    description: 'Infused with 50x Vitamin C and traditional Indian turmeric to reduce pigmentation, boost collagen, fight free radicals and give natural radiant glow without toxins.',
    price: 359,
    original_price: 399,
    currency: 'INR',
    rating: 4.4,
    review_count: 31000,
    stock_qty: 150,
    color_options: ['Natural'],
    size_options: ['30ml', '50ml'],
    specifications: {
      KeyIngredients: 'Vitamin C, Turmeric, Niacinamide',
      SkinType: 'All Skin Types (Dermatologically Tested)',
      ToxinFree: 'No Parabens, Silicones, Mineral Oils',
      Volume: '30 ml'
    },
    tags: ['mamaearth', 'serum', 'vitamin c', 'skincare', 'glowing skin', 'under 500', 'beauty'],
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    seller: 'Honasa Consumer Ltd',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-bea-002',
    sku: 'BHARAT-BEA-002',
    name: 'Lakme 9 to 5 Primer + Matte Liquid Lip Color (Red Letter, 5.6ml)',
    brand: 'Lakme',
    category: 'Beauty',
    subcategory: 'Lipsticks',
    description: 'Built-in primer locks in rich velvet matte color for up to 16 hours. Non-drying formula enriched with Vitamin E for soft, crease-free Indian wedding lips.',
    price: 399,
    original_price: 525,
    currency: 'INR',
    rating: 4.5,
    review_count: 24500,
    stock_qty: 110,
    color_options: ['Red Letter', 'Pink Blush', 'Maple Latte', 'Berry Base'],
    size_options: ['5.6ml'],
    specifications: {
      Finish: 'Matte Liquid with built-in primer',
      WearTime: 'Up to 16 hours smudge-proof',
      NetQuantity: '5.6 ml',
      Ingredients: 'Enriched with Vitamin E and Argan Oil'
    },
    tags: ['lakme', 'lipstick', 'matte lipstick', 'red lips', 'beauty', 'festive makeup', 'under 500'],
    image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    seller: 'Hindustan Unilever Direct',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 10. KITCHEN & HOME APPLIANCES (25 products)
  // ==========================================
  {
    id: 'prod-app-001',
    sku: 'BHARAT-APP-001',
    name: 'Prestige Iris 750 Watt Mixer Grinder with 3 Stainless Steel Jars + Juicer Jar',
    brand: 'Prestige',
    category: 'Kitchen',
    subcategory: 'Mixer Grinders',
    description: 'Heavy duty 750W motor for tough Indian masalas, idli batter, chutneys and juices with multi-purpose stainless steel jars, ergonomic handles and overload protection.',
    price: 2999,
    original_price: 6195,
    currency: 'INR',
    rating: 4.3,
    review_count: 42000,
    stock_qty: 55,
    color_options: ['White & Blue', 'Black'],
    size_options: ['750W (4 Jars)'],
    specifications: {
      MotorPower: '750 Watts Pure Copper Motor',
      Jars: '1.5L Wet Jar, 1.0L Dry Jar, 300ml Chutney Jar + 1.5L Transparent Juicer Jar',
      SpeedControl: '3 Speed with Whip',
      Safety: 'Overload Protection Switch',
      Warranty: '2 Years Manufacturer Warranty'
    },
    tags: ['prestige', 'mixer grinder', 'mixie', 'kitchen appliance', '750w', 'under 3000', 'indian cooking'],
    image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    seller: 'TTK Prestige India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-app-002',
    sku: 'BHARAT-APP-002',
    name: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1 Litre, Touch Panel)',
    brand: 'Philips',
    category: 'Kitchen',
    subcategory: 'Air Fryers',
    description: 'Fry with up to 90% less oil using patented Rapid Air Technology. Features 7 pre-set Indian cooking menus, Keep Warm function and dishwasher safe parts.',
    price: 7999,
    original_price: 12995,
    currency: 'INR',
    rating: 4.6,
    review_count: 18700,
    stock_qty: 35,
    color_options: ['Black'],
    size_options: ['4.1 Litres'],
    specifications: {
      Capacity: '4.1 Litres (Up to 4 Portions)',
      Power: '1400 Watts',
      TemperatureRange: '60°C to 200°C',
      Presets: '7 Pre-set cooking menus (Samosas, Fries, Chicken, Fish, Cake)',
      Warranty: '2 Years Philips Worldwide Warranty'
    },
    tags: ['philips', 'air fryer', 'healthy cooking', 'low oil', 'kitchen', 'under 8000', 'digital air fryer'],
    image_url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    seller: 'Philips Domestic Appliances India',
    delivery_days: 2,
    active: true
  },
  {
    id: 'prod-app-003',
    sku: 'BHARAT-APP-003',
    name: 'Pigeon by Stovekraft Cruise 1800-Watt Induction Cooktop (Black)',
    brand: 'Pigeon',
    category: 'Kitchen',
    subcategory: 'Cooktops',
    description: 'Fast induction cooking with 7 preset Indian menu options, dual heat sensor, crystal glass surface, auto-off safety and 93% energy saving technology.',
    price: 1599,
    original_price: 3195,
    currency: 'INR',
    rating: 4.2,
    review_count: 65000,
    stock_qty: 90,
    color_options: ['Black'],
    size_options: ['1800W'],
    specifications: {
      Power: '1800 Watts',
      Plate: 'Microcrystal Plate with Push Button Controls',
      Presets: '7 Indian Presets (Roti, Dosa, Milk, Pressure Cook, Curry)',
      Warranty: '1 Year Warranty'
    },
    tags: ['pigeon', 'induction cooktop', 'kitchen', 'electric stove', 'under 2000', 'energy saving'],
    image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    seller: 'Stovekraft Kitchen Hub',
    delivery_days: 2,
    active: true
  },

  // ==========================================
  // 11. TELEVISIONS & ENTERTAINMENT (10 products)
  // ==========================================
  {
    id: 'prod-tv-001',
    sku: 'BHARAT-TV-001',
    name: 'Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X74L',
    brand: 'Sony',
    category: 'TV',
    subcategory: 'Smart TVs',
    description: '4K Processor X1 with Live Color, Google TV with Voice Assistant, 20W open baffle speaker with Dolby Audio and Apple AirPlay 2 support.',
    price: 54990,
    original_price: 99900,
    currency: 'INR',
    rating: 4.7,
    review_count: 11000,
    stock_qty: 18,
    color_options: ['Black'],
    size_options: ['55 inches'],
    specifications: {
      Resolution: '4K Ultra HD (3840 x 2160) 60Hz',
      Audio: '20 Watts Output with Dolby Audio',
      SmartTV: 'Google TV, Chromecast built-in, Netflix, Prime Video, Hotstar',
      Ports: '3 HDMI ports, 2 USB ports',
      Warranty: '1 Year Comprehensive + 1 Year Additional on Panel'
    },
    tags: ['sony', 'tv', 'bravia', '55 inch tv', '4k tv', 'google tv', 'dolby audio'],
    image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
    seller: 'Sony Bravia Direct',
    delivery_days: 3,
    active: true
  },
  {
    id: 'prod-tv-002',
    sku: 'BHARAT-TV-002',
    name: 'Xiaomi 108 cm (43 inches) X Series 4K Ultra HD Smart Google TV (L43M8-A2IN)',
    brand: 'Xiaomi',
    category: 'TV',
    subcategory: 'Smart TVs',
    description: 'Bezel-less 4K Dolby Vision display, 30W stereo speakers with Dolby Audio & DTS:X, PatchWall+ with 300+ free live channels and Google TV.',
    price: 24999,
    original_price: 39999,
    currency: 'INR',
    rating: 4.3,
    review_count: 23000,
    stock_qty: 30,
    color_options: ['Black Metal'],
    size_options: ['43 inches'],
    specifications: {
      Resolution: '4K Ultra HD (3840x2160)',
      HDR: 'Dolby Vision, HDR10, HLG',
      Sound: '30 Watts Dolby Audio DTS-Virtual:X',
      OS: 'Google TV with PatchWall+',
      Warranty: '1 Year Comprehensive'
    },
    tags: ['xiaomi', 'mi tv', '43 inch', '4k tv', 'smart tv', 'under 25k', 'under 30k', 'dolby vision'],
    image_url: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80',
    seller: 'Xiaomi India E-Hub',
    delivery_days: 3,
    active: true
  },

  // ==========================================
  // 12. FURNITURE & HOME LIVING (10 products)
  // ==========================================
  {
    id: 'prod-fur-001',
    sku: 'BHARAT-FUR-001',
    name: 'Wakefit Orthopedic Memory Foam Mattress (78x72x6 inches, King Size)',
    brand: 'Wakefit',
    category: 'Furniture',
    subcategory: 'Mattresses',
    description: 'Designed for spinal alignment and pressure relief with differential zone support, breathable 3D spacer fabric cover and 10 years manufacturer warranty.',
    price: 11999,
    original_price: 18999,
    currency: 'INR',
    rating: 4.6,
    review_count: 45000,
    stock_qty: 25,
    color_options: ['White & Grey'],
    size_options: ['King Size 78x72x6', 'Queen Size 78x60x6'],
    specifications: {
      Dimensions: '78 x 72 x 6 inches (King)',
      Material: 'High Resilience Foam + Next-Gen Memory Foam',
      Firmness: 'Medium Firm for spine support',
      Warranty: '10 Years Manufacturer Warranty'
    },
    tags: ['wakefit', 'mattress', 'memory foam', 'orthopedic', 'bed', 'furniture', 'sleep'],
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    seller: 'Wakefit Innovations Direct',
    delivery_days: 4,
    active: true
  },
  {
    id: 'prod-fur-002',
    sku: 'BHARAT-FUR-002',
    name: 'Green Soul Jupiter High Back Ergonomic Office Chair with 2D Lumbar Support',
    brand: 'Green Soul',
    category: 'Furniture',
    subcategory: 'Office Chairs',
    description: 'Engineered for 8+ hours posture correction with breathable Korean mesh, multi-tilt synchro mechanism, adjustable 2D arms and heavy duty nylon base.',
    price: 7999,
    original_price: 15999,
    currency: 'INR',
    rating: 4.5,
    review_count: 14000,
    stock_qty: 35,
    color_options: ['Smart Black', 'Grey'],
    size_options: ['High Back'],
    specifications: {
      Mechanism: 'Synchro Multi-Lock Tilting 90-135 degrees',
      Lumbar: 'Height & Depth 2D Adjustable Lumbar Support',
      WeightCapacity: 'Up to 125 kg',
      Warranty: '3 Years Comprehensive Warranty'
    },
    tags: ['green soul', 'ergonomic chair', 'office chair', 'wfh', 'study chair', 'under 8000'],
    image_url: 'https://images.unsplash.com/photo-1580481077194-c5a452a35360?auto=format&fit=crop&w=600&q=80',
    seller: 'Green Soul Ergonomics Store',
    delivery_days: 3,
    active: true
  },

  // ==========================================
  // 13. GROCERY & GOURMET (10 products)
  // ==========================================
  {
    id: 'prod-gro-001',
    sku: 'BHARAT-GRO-001',
    name: 'Tata Tea Gold 1kg (Exotic Assam Teas with Gently Rolled Long Leaves)',
    brand: 'Tata Tea',
    category: 'Grocery',
    subcategory: 'Tea & Coffee',
    description: 'An exquisite blend of fine Assam CTC teas with 15% gently rolled long leaves to provide rich aroma and irresistible taste in every single cup.',
    price: 499,
    original_price: 650,
    currency: 'INR',
    rating: 4.7,
    review_count: 52000,
    stock_qty: 200,
    color_options: ['Standard'],
    size_options: ['1 kg', '500g'],
    specifications: {
      Weight: '1 kg Jar / Pack',
      Blend: 'CTC Tea with 15% Long Leaves',
      Origin: 'Assam, India',
      Storage: 'Store in an airtight container after opening'
    },
    tags: ['tata tea', 'tea', 'chai', 'assam tea', 'grocery', 'under 500', 'beverage'],
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    seller: 'Tata Consumer Products Hub',
    delivery_days: 1,
    active: true
  },
  {
    id: 'prod-gro-002',
    sku: 'BHARAT-GRO-002',
    name: 'India Gate Basmati Rice Super, 5kg Bag (Aged Aromatic Long Grains)',
    brand: 'India Gate',
    category: 'Grocery',
    subcategory: 'Rice & Grains',
    description: 'Fluffy, slender and non-sticky aged grains with peerless aroma, perfect for Indian Biryani, Pulao and festive family feasts.',
    price: 749,
    original_price: 990,
    currency: 'INR',
    rating: 4.6,
    review_count: 38000,
    stock_qty: 120,
    color_options: ['Standard'],
    size_options: ['5 kg', '1 kg'],
    specifications: {
      NetWeight: '5 kg',
      GrainType: 'Aged Long Grain Basmati',
      IdealFor: 'Biryani, Pulao, Fried Rice',
      ShelfLife: '24 Months'
    },
    tags: ['basmati rice', 'rice', 'india gate', 'biryani', 'grocery', 'under 1000'],
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    seller: 'KRBL Foods India',
    delivery_days: 1,
    active: true
  }
];

// Helper function to expand catalogue with systematic variants to guarantee 200+ realistic products
export function getAllCatalogueProducts(): Product[] {
  const result: Product[] = [...SEED_PRODUCTS];

  // Systematically generate realistic seeded Indian products across categories up to 210 items
  const brandsByCategory: Record<string, string[]> = {
    'Mobile Phones': ['Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'POCO', 'Motorola', 'Vivo', 'iQOO', 'Apple', 'Nothing'],
    'Laptops': ['Lenovo', 'HP', 'Dell', 'ASUS', 'Acer', 'Apple', 'MSI'],
    'Headphones': ['boAt', 'Noise', 'Sony', 'OnePlus', 'Realme', 'JBL', 'Boult Audio'],
    'Smartwatches': ['Noise', 'boAt', 'Fire-Boltt', 'Fastrack', 'Samsung', 'Amazfit'],
    'Sarees': ['Banarasi Heritage', 'Suta Silks', 'FabCraft India', 'Rajasthani Rang', 'Kalamkari House', 'Surat Weaves'],
    'Kurtis': ['Libas', 'Biba', 'W for Woman', 'Aurelia', 'Rangriti', 'Global Desi'],
    "Men's Clothing": ['Manyavar', "Levi's", 'Peter England', 'Allen Solly', 'Roadster', 'Van Heusen'],
    'Shoes': ['Red Tape', 'Puma', 'Bata', 'Sparx', 'Woodland', 'Campus'],
    'Skincare': ['Mamaearth', 'Lakme', 'Minimalist', 'Dot & Key', 'Plum', 'Forest Essentials'],
    'Kitchen': ['Prestige', 'Philips', 'Pigeon', 'Bajaj', 'Wonderchef', 'Kent', 'Hawkins'],
    'TV': ['Sony', 'Samsung', 'Xiaomi', 'LG', 'OnePlus', 'TCL'],
    'Furniture': ['Wakefit', 'Green Soul', 'Sleepyhead', 'Solimo', 'Nilkamal'],
    'Grocery': ['Tata Tea', 'India Gate', 'Fortune', 'Dabur', 'Aashirvaad', 'Saffola']
  };

  const categorySubcategories: Record<string, string[]> = {
    'Mobile Phones': ['Smartphones', 'Budget Phones', 'Gaming Phones'],
    'Laptops': ['Ultrabooks', 'Student Laptops', 'Gaming Laptops', 'Business Laptops'],
    'Headphones': ['TWS Earbuds', 'Over-Ear Headphones', 'Neckbands'],
    'Smartwatches': ['Bluetooth Calling Watches', 'Fitness Trackers', 'AMOLED Watches'],
    'Sarees': ['Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Chiffon Sarees', 'Bandhani Sarees'],
    'Kurtis': ['Kurta Sets', 'Straight Kurtis', 'Anarkali Kurtas', 'Palazzo Sets'],
    "Men's Clothing": ['Ethnic Wear', 'Shirts', 'Jeans', 'Trousers', 'T-Shirts'],
    'Shoes': ['Sneakers', 'Running Shoes', 'Formal Shoes', 'Sandals'],
    'Skincare': ['Serums', 'Sunscreens', 'Moisturizers', 'Face Wash'],
    'Kitchen': ['Mixer Grinders', 'Air Fryers', 'Cooktops', 'Electric Kettles', 'Pressure Cookers'],
    'TV': ['Smart TVs', '4K LED TVs', 'OLED TVs'],
    'Furniture': ['Mattresses', 'Office Chairs', 'Study Desks', 'Recliners'],
    'Grocery': ['Tea & Coffee', 'Rice & Grains', 'Edible Oils', 'Dry Fruits', 'Spices']
  };

  const sampleImages: Record<string, string[]> = {
    'Mobile Phones': [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80'
    ],
    'Laptops': [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
    ],
    'Headphones': [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80'
    ],
    'Smartwatches': [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80'
    ],
    'Sarees': [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
    ],
    'Kurtis': [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
    ],
    "Men's Clothing": [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80'
    ],
    'Shoes': [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80'
    ],
    'Skincare': [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80'
    ],
    'Kitchen': [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
    ],
    'TV': [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80'
    ],
    'Furniture': [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580481077194-c5a452a35360?auto=format&fit=crop&w=600&q=80'
    ],
    'Grocery': [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
    ]
  };

  const priceTiers: Record<string, number[]> = {
    'Mobile Phones': [9999, 12999, 16999, 19999, 22999, 27999, 32999, 39999, 54999],
    'Laptops': [29990, 37990, 44990, 52990, 64990, 79990],
    'Headphones': [999, 1499, 1999, 2799, 3999, 7999, 14999],
    'Smartwatches': [1499, 1999, 2999, 3999, 5999, 12999],
    'Sarees': [699, 999, 1399, 1799, 2299, 2899, 3499],
    'Kurtis': [699, 999, 1299, 1699, 2199, 2799],
    "Men's Clothing": [599, 899, 1299, 1799, 2499, 3299],
    'Shoes': [899, 1299, 1799, 2299, 2999, 4499],
    'Skincare': [249, 349, 499, 699, 899, 1299],
    'Kitchen': [999, 1499, 2299, 3499, 4999, 7499],
    'TV': [14999, 21999, 29999, 38999, 49999],
    'Furniture': [4999, 7999, 10999, 14999, 19999],
    'Grocery': [199, 349, 499, 749, 1199]
  };

  let counter = result.length + 1;
  const categories = Object.keys(brandsByCategory);

  // Add items until we have 215 items
  while (result.length < 215) {
    for (const cat of categories) {
      if (result.length >= 215) break;

      const brands = brandsByCategory[cat] || ['BharatBrand'];
      const subcats = categorySubcategories[cat] || ['General'];
      const prices = priceTiers[cat] || [999, 1999, 2999];
      const imgs = sampleImages[cat] || ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'];

      const brand = brands[(counter * 7) % brands.length];
      const subcat = subcats[(counter * 3) % subcats.length];
      const price = prices[counter % prices.length];
      const original_price = Math.round(price * 1.35);
      const rating = Number((4.0 + ((counter * 17) % 10) * 0.08).toFixed(1));
      const review_count = 500 + ((counter * 311) % 25000);
      const delivery_days = 1 + (counter % 4);
      const stock_qty = 10 + ((counter * 23) % 90);
      const img = imgs[counter % imgs.length];

      const colors = ['Black', 'Blue', 'Silver', 'White', 'Maroon', 'Red', 'Gold'];
      const chosenColor = colors[counter % colors.length];

      let name = `${brand} ${subcat} Classic Series (${chosenColor})`;
      let specs: Record<string, string> = {
        Brand: brand,
        Category: cat,
        Subcategory: subcat,
        Color: chosenColor,
        Warranty: '1 Year Brand Warranty'
      };

      if (cat === 'Mobile Phones') {
        name = `${brand} Neo 5G (${chosenColor}, 8GB RAM, 128GB Storage)`;
        specs = {
          RAM: '8GB',
          Storage: '128GB',
          Battery: '5000 mAh Fast Charge',
          Camera: '50MP AI Dual Camera',
          Processor: 'Octa-Core 5G Chipset',
          Display: '6.67-inch FHD+ 120Hz',
          Network: '5G'
        };
      } else if (cat === 'Sarees') {
        name = `${brand} Festive Woven ${subcat} (${chosenColor} with Zari Work)`;
        specs = {
          Fabric: 'Art Silk / Cotton Blend',
          Length: '5.5m Saree + 0.8m Blouse Piece',
          Occasion: 'Festive, Party, Puja',
          WashCare: 'Dry Clean or Gentle Handwash'
        };
      } else if (cat === 'Kurtis') {
        name = `${brand} Embroidered Straight ${subcat} (${chosenColor})`;
        specs = {
          Fabric: '100% Pure Cotton',
          Sleeve: '3/4th Sleeves',
          Occasion: 'Daily Wear / Festive',
          WashCare: 'Hand Wash separately'
        };
      } else if (cat === 'Kitchen') {
        name = `${brand} Smart ${subcat} Series (Energy Efficient)`;
        specs = {
          Power: '750W - 1500W',
          Material: 'Stainless Steel & Food Grade Plastic',
          Warranty: '2 Years Manufacturer Warranty'
        };
      }

      result.push({
        id: `prod-seed-${String(counter).padStart(3, '0')}`,
        sku: `BHARAT-CAT-${cat.slice(0, 3).toUpperCase()}-${String(counter).padStart(3, '0')}`,
        name,
        brand,
        category: cat,
        subcategory: subcat,
        description: `High-quality ${name} designed for Indian consumers with premium finish, verified durability, and value-for-money pricing.`,
        price,
        original_price,
        currency: 'INR',
        rating,
        review_count,
        stock_qty,
        color_options: [chosenColor, 'Standard'],
        size_options: cat === 'Kurtis' ? ['S', 'M', 'L', 'XL'] : cat === 'Shoes' ? ['UK 7', 'UK 8', 'UK 9', 'UK 10'] : ['Standard'],
        specifications: specs,
        tags: [cat.toLowerCase(), brand.toLowerCase(), subcat.toLowerCase(), chosenColor.toLowerCase(), `under ${Math.ceil(price / 1000) * 1000}`],
        image_url: img,
        seller: `${brand} India Hub`,
        delivery_days,
        active: true
      });

      counter++;
    }
  }

  return result;
}
