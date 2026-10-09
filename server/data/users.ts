import { UserProfile } from '../../src/types/index';

export const SEED_PROFILES: UserProfile[] = [
  {
    id: 'usr-demo-001',
    user_id: 'usr-demo-001',
    email: 'shopper@bharatshop.ai',
    full_name: 'Jackson Reed',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'shopper',
    preferred_language: 'en',
    city_tier: 'Tier-2',
    city: 'Indore',
    state: 'Madhya Pradesh',
    preferred_categories: ['Mobile Phones', 'Fashion', 'Kitchen'],
    budget_min: 2000,
    budget_max: 35000,
    payment_preference: 'UPI',
    personalization_enabled: true,
    analytics_consent: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-10-07T00:00:00Z'
  },
  {
    id: 'usr-admin-001',
    user_id: 'usr-admin-001',
    email: 'admin@bharatshop.ai',
    full_name: 'BharatShop Admin Lead',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    preferred_language: 'en',
    city_tier: 'Tier-1',
    city: 'Bengaluru',
    state: 'Karnataka',
    preferred_categories: ['All Categories'],
    budget_min: 0,
    budget_max: 100000,
    payment_preference: 'UPI',
    personalization_enabled: true,
    analytics_consent: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-07T00:00:00Z'
  }
];
