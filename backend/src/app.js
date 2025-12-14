import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import sweetRoutes from './routes/sweetRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sweet Shop API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);
app.use('/api/sweets', inventoryRoutes); 
app.use('/api/inventory', inventoryRoutes); 

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;