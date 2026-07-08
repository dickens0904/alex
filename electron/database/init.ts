import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';
import { app } from 'electron';

let db: Database.Database | null = null;
let dbAvailable = false;

export function initDatabase(): void {
  try {
    // 数据库文件路径
    const dbPath = path.join(app.getPath('userData'), 'english-practice.db');

    // 确保目录存在
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // 创建数据库连接
    db = new Database(dbPath);

    // 启用外键约束
    db.pragma('foreign_keys = ON');

    // 创建表
    createTables();

    dbAvailable = true;
    console.log('数据库初始化完成:', dbPath);
  } catch (error) {
    console.error('数据库初始化失败，应用将继续运行（数据库功能不可用）:', error);
    db = null;
    dbAvailable = false;
  }
}

/**
 * 检查数据库是否可用
 */
export function isDatabaseAvailable(): boolean {
  return dbAvailable;
}

function createTables(): void {
  if (!db) throw new Error('数据库未初始化');

  // 用户表
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatar TEXT,
      total_score INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 课程表
  db.exec(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT CHECK(type IN ('new', 'review')),
      grammar TEXT,
      tense TEXT,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 学习进度表
  db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id INTEGER,
      user_id INTEGER,
      completed BOOLEAN DEFAULT FALSE,
      score INTEGER,
      time_spent INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 成就表
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      achievement_type TEXT NOT NULL,
      achievement_name TEXT NOT NULL,
      earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 创建默认用户
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count === 0) {
    db.prepare('INSERT INTO users (name, avatar, total_score) VALUES (?, ?, ?)').run(
      '小朋友',
      'default',
      0
    );
  }
}

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('数据库未初始化');
  }
  return db;
}
