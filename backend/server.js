import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
//const profileRoutes = import('./routes/profile');
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
//app.use('/profile', profileRoutes);

// Routes
app.use('/auth', authRoutes); // Register the auth routes under /auth

// Basic route
app.get('/', (req, res) => {
  res.send('Book Exchange Platform API');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookexchangedb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
