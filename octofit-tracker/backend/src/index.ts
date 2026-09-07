import express from 'express';
import { connectDB } from './db';
import activitiesRouter from './routes/activities';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

const app = express();
app.use(express.json());

// Simple CORS middleware (no external dependency required)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running');
});

// Mount API routes
app.use('/api/activities', activitiesRouter);

async function start() {
  try {
    await connectDB(MONGO_URI);
  } catch (err) {
    console.error('Could not connect to DB; continuing to start server (inspect logs).');
  }

  app.listen(PORT, () => {
    console.log(`Backend listening at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
