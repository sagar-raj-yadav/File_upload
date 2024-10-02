// server/routes/files.js
import express from 'express';
import File from '../models/File.js'
const router = express.Router();

// Upload File
router.post('/upload', async (req, res) => {
  console.log('Received file:', req.file); // Log the received file

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const newFile = new File({
    filename: req.file.originalname,
    filePath: req.file.path,
  });

  try {
    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully!', file: newFile });
  } catch (error) {
    console.error('Error saving file to database:', error);
    res.status(500).json({ message: 'Failed to save file.' });
  }
});


export default router;
