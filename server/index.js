// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully'); // Success message
})
.catch(err => {
  console.error('MongoDB connection error:', err); // Error handling
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', upload.single('file'), fileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
