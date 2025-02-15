import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Proper CORS Configuration
const allowedOrigins = [
  'https://react-ecommerce-app-hj3b.vercel.app', 
  'https://payment-integration-blond.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Manually Handle Preflight Requests (For Vercel)
app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
