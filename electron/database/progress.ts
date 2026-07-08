import { getDatabase } from './init';

export interface Progress {
  id?: number;
  lesson_id: number;
  user_id: number;
  completed: boolean;
  score: number;
  time_spent: number;
  created_at?: string;
}

export function saveProgress(progress: Progress): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO progress (lesson_id, user_id, completed, score, time_spent)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    progress.lesson_id,
    progress.user_id,
    progress.completed ? 1 : 0,
    progress.score,
    progress.time_spent
  );
}

export function getProgressByLesson(lessonId: number): Progress[] {
  const db = getDatabase();
  return db
    .prepare('SELECT * FROM progress WHERE lesson_id = ? ORDER BY created_at DESC')
    .all(lessonId) as Progress[];
}

export function getProgressByUser(userId: number): Progress[] {
  const db = getDatabase();
  return db
    .prepare('SELECT * FROM progress WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId) as Progress[];
}

export function getLatestProgress(lessonId: number, userId: number): Progress | null {
  const db = getDatabase();
  return db
    .prepare(
      'SELECT * FROM progress WHERE lesson_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 1'
    )
    .get(lessonId, userId) as Progress | null;
}
