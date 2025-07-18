// backend/cleanup.js
import db from './db.js';
import fs from 'fs';

const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

db.all('SELECT file_path FROM print_jobs WHERE created_at < ?', [oneMonthAgo], (err, rows) => {
  rows.forEach(row => {
    fs.unlinkSync(row.file_path); // Delete file
  });

  db.run('DELETE FROM print_jobs WHERE created_at < ?', [oneMonthAgo]);
});
