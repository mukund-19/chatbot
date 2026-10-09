import { Order } from '../../src/types/index';

export const SEED_ORDERS: Order[] = [
  {
    id: 'ord-001',
    user_id: 'usr-demo-001',
    order_number: 'ORD-10025',
    order_date: '2026-10-05T14:30:00Z',
    status: 'shipped',
    total_amount: 24999,
    payment_method: 'UPI (PhonePe)',
    courier: 'Delhivery Express',
    tracking_number: 'DEL-IN-893420194',
    shipping_address: {
      name: 'Jackson Reed (Demo Shopper)',
      street: 'Flat 402, Sai Residency, MG Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      phone: '+91 98260 12345'
    },
    estimated_delivery: '2026-10-09',
    last_update: '2026-10-07T08:15:00Z: Package arrived at regional sorting facility in Bhopal. In transit to Indore delivery hub.',
    items: [
      {
        id: 'ord-item-001',
        product_id: 'prod-mob-001',
        product_name: 'OnePlus Nord CE4 5G (Dark Chrome, 8GB RAM, 128GB Storage)',
        product_image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        price: 24999
      }
    ]
  },
  {
    id: 'ord-002',
    user_id: 'usr-demo-001',
    order_number: 'ORD-10026',
    order_date: '2026-10-06T18:10:00Z',
    status: 'packed',
    total_amount: 1899,
    payment_method: 'Cash on Delivery (COD)',
    courier: 'Blue Dart Surface',
    tracking_number: 'BD-IN-773412098',
    shipping_address: {
      name: 'Jackson Reed (Demo Shopper)',
      street: 'Flat 402, Sai Residency, MG Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      phone: '+91 98260 12345'
    },
    estimated_delivery: '2026-10-10',
    last_update: '2026-10-07T11:00:00Z: Item packed by Varanasi Weavers Hub. Awaiting courier pickup.',
    items: [
      {
        id: 'ord-item-002',
        product_id: 'prod-sar-001',
        product_name: 'Kanjivaram Soft Silk Saree with Rich Zari Pallu (Royal Red & Gold)',
        product_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        price: 1899
      }
    ]
  },
  {
    id: 'ord-003',
    user_id: 'usr-demo-001',
    order_number: 'ORD-10027',
    order_date: '2026-10-01T09:00:00Z',
    status: 'delivered',
    total_amount: 2499,
    payment_method: 'UPI (Google Pay)',
    courier: 'XpressBees Priority',
    tracking_number: 'XB-99824102',
    shipping_address: {
      name: 'Jackson Reed (Demo Shopper)',
      street: 'Flat 402, Sai Residency, MG Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      phone: '+91 98260 12345'
    },
    estimated_delivery: '2026-10-04',
    last_update: '2026-10-04T16:20:00Z: Delivered to recipient. Signature verified.',
    items: [
      {
        id: 'ord-item-003',
        product_id: 'prod-aud-001',
        product_name: 'boAt Nirvana Ion ANC Truly Wireless Earbuds (Charcoal Black)',
        product_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        price: 2499
      }
    ]
  }
];
