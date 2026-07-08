import { getDatabase } from './init';
import { Lesson } from '../types/lesson';

export function getAllLessons(): Lesson[] {
  const db = getDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lessons = db.prepare('SELECT * FROM lessons ORDER BY id').all() as any[];

  return lessons.map((lesson) => ({
    ...lesson,
    content: lesson.content ? JSON.parse(lesson.content) : null,
  }));
}

export function getLessonById(id: number): Lesson | null {
  const db = getDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(id) as any;

  if (!lesson) return null;

  return {
    ...lesson,
    content: lesson.content ? JSON.parse(lesson.content) : null,
  };
}

export function saveLesson(lesson: Lesson): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO lessons (id, title, type, grammar, tense, content)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    lesson.id,
    lesson.title,
    lesson.type,
    lesson.grammar,
    lesson.tense,
    JSON.stringify(lesson.content)
  );
}

export function saveLessons(lessons: Lesson[]): void {
  const db = getDatabase();
  const insertMany = db.transaction((lessons: Lesson[]) => {
    for (const lesson of lessons) {
      saveLesson(lesson);
    }
  });

  insertMany(lessons);
}
