import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export async function openDb() {
  return open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
}

export async function initializeDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      summary VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      type VARCHAR(25) NOT NULL,
      status VARCHAR(25) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATE,
      assignee VARCHAR(50),
      reporter VARCHAR(50) NOT NULL
    )
  `);
  console.log('Tabela "products" configurada.');
  return db;
}