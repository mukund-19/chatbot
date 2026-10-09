import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { apiRouter } from './server/routes';
import { db } from './server/db';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Mount all BharatShop AI REST APIs
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'BharatShop AI',
    catalogSize: db.getProducts().length,
    ordersCount: db.getOrders().length,
    timestamp: new Date().toISOString(),
  });
});

// Set up Vite in development or serve static build in production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🛍️  BharatShop AI Assistant Server`);
    console.log(`🚀  Running live at http://localhost:${PORT}`);
    console.log(`📦  Loaded ${db.getProducts().length} seeded products`);
    console.log(`=======================================================`);
  });
}

startServer();
