import { Database } from "bun:sqlite"
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'

const db = new Database(process.env.DATABASE_PATH || './prompty.db')

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    min_length INTEGER DEFAULT 50,
    max_length INTEGER DEFAULT 500,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_id TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prompt_id) REFERENCES prompts (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(prompt_id, user_id)
  );

  CREATE INDEX IF NOT EXISTS idx_prompts_expires_at ON prompts(expires_at);
  CREATE INDEX IF NOT EXISTS idx_responses_prompt_id ON responses(prompt_id);
`)

export const userModel = {
  create: async (email: string, password: string, username?: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const stmt = db.prepare('INSERT INTO users (email, password, username) VALUES (?, ?, ?)')
    const result = stmt.run(email, hashedPassword, username || email.split('@')[0])
    return result.lastInsertRowid
  },

  findByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
    return stmt.get(email)
  },

  findById: (id: number) => {
    const stmt = db.prepare('SELECT id, email, username, created_at FROM users WHERE id = ?')
    return stmt.get(id)
  },

  verifyPassword: async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
  }
}

export const promptModel = {
  create: (userId: number, title: string, description: string, minLength: number, maxLength: number, expiresIn: number) => {
    const id = randomBytes(8).toString('hex')
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()
    
    const stmt = db.prepare(`
      INSERT INTO prompts (id, user_id, title, description, min_length, max_length, expires_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(id, userId, title, description, minLength, maxLength, expiresAt)
    return id
  },

  findById: (id: string) => {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name 
      FROM prompts p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = ?
    `)
    return stmt.get(id)
  },

  findByUserId: (userId: number) => {
    const stmt = db.prepare(`
      SELECT p.*, COUNT(r.id) as response_count
      FROM prompts p
      LEFT JOIN responses r ON p.id = r.prompt_id
      WHERE p.user_id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `)
    return stmt.all(userId)
  },

  findRespondedByUserId: (userId: number) => {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name, COUNT(r2.id) as response_count
      FROM prompts p
      JOIN users u ON p.user_id = u.id
      JOIN responses r ON p.id = r.prompt_id AND r.user_id = ?
      LEFT JOIN responses r2 ON p.id = r2.prompt_id
      GROUP BY p.id
      ORDER BY r.created_at DESC
    `)
    return stmt.all(userId)
  },

  isExpired: (prompt: any) => {
    return new Date(prompt.expires_at) < new Date()
  }
}

export const responseModel = {
  create: (promptId: string, userId: number, response: string) => {
    const stmt = db.prepare('INSERT INTO responses (prompt_id, user_id, response) VALUES (?, ?, ?)')
    const result = stmt.run(promptId, userId, response)
    return result.lastInsertRowid
  },

  findByPromptId: (promptId: string) => {
    const stmt = db.prepare(`
      SELECT r.*, u.username 
      FROM responses r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.prompt_id = ?
      ORDER BY r.created_at ASC
    `)
    return stmt.all(promptId)
  },

  hasUserResponded: (promptId: string, userId: number) => {
    const stmt = db.prepare('SELECT 1 FROM responses WHERE prompt_id = ? AND user_id = ?')
    return !!stmt.get(promptId, userId)
  }
}

export default db