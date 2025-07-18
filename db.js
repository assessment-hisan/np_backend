import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS print_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT,
      color TEXT,
      paper_size TEXT,
      file_path TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
