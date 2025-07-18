import express from 'express';
import db from './db.js';
import { upload } from './upload.js';
import fs from 'fs';
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    console.log('REQ BODY:', req.body);
console.log('REQ FILE:', req.file);
  const { user_name, color, paper_size } = req.body;
  const file_path = req.file?.path;

  if (!file_path) return res.status(400).json({ error: 'File not received' });

  db.run(
    'INSERT INTO print_jobs (user_name, color, paper_size, file_path) VALUES (?, ?, ?, ?)',
    [user_name, color, paper_size, file_path],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Upload successful' });
    }
  );
});


router.get('/jobs', (req, res) => {
  db.all('SELECT * FROM print_jobs ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;
