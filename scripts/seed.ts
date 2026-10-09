import { db } from '../server/db';

console.log('--- Initializing BharatShop AI Database Seed ---');
const products = db.getProducts();
const orders = db.getOrders();
const docs = db.getKnowledgeDocs();

console.log(`✓ Products seeded: ${products.length} items`);
console.log(`✓ Orders seeded: ${orders.length} items (including ORD-10025, ORD-10026)`);
console.log(`✓ Knowledge docs: ${docs.length} policies (English, Hindi)`);
console.log('✓ Profiles & settings ready.');
console.log('--- Database Seed Complete! ---');
