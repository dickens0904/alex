/**
 * 课程数据服务
 * 合并课程内容和自动生成的练习题，提供统一的数据访问接口
 *
 * 数据懒加载：completeLessons + generatedExercises 体积较大（约 1.1MB 源码），
 * 通过 dynamic import 拆分为独立 chunk，仅在实际需要时才加载，
 * 避免拖慢首屏。首次调用后结果会被缓存。
 */
import type { Lesson } from '../types/lesson';

interface LoadedLessonData {
  lessons: Lesson[];
  exercisesMap: Record<string, unknown[]>;
}

let dataPromise: Promise<LoadedLessonData> | null = null;

/** 懒加载课程内容与练习题数据（结果缓存） */
function loadLessonData(): Promise<LoadedLessonData> {
  if (!dataPromise) {
    dataPromise = Promise.all([
      import('../data/lessons/completeLessons'),
      import('../data/lessons/generatedExercises'),
    ]).then(([completeLessonsModule, generatedExercisesModule]) => ({
      lessons: completeLessonsModule.default as Lesson[],
      exercisesMap: generatedExercisesModule.exercisesMap as Record<string, unknown[]>,
    }));
  }
  return dataPromise;
}

/** 合并练习题到课程（优先使用自动生成的练习题，格式更完整、题型更丰富） */
function mergeExercises(lesson: Lesson, exercisesMap: Record<string, unknown[]>): Lesson {
  const generatedExercises = exercisesMap[lesson.id] || [];
  const existingExercises = lesson.content.exercises || [];
  const exercises = generatedExercises.length > 0 ? generatedExercises : existingExercises;

  return {
    ...lesson,
    content: {
      ...lesson.content,
      exercises: exercises as Lesson['content']['exercises'],
    },
  };
}

/**
 * 获取合并了练习题的完整课程数据
 */
export async function getAllLessons(): Promise<Lesson[]> {
  const { lessons, exercisesMap } = await loadLessonData();
  return lessons.map((lesson) => mergeExercises(lesson, exercisesMap));
}

/**
 * 根据 ID 获取单课数据（含练习题）
 */
export async function getLessonById(id: number): Promise<Lesson | null> {
  const { lessons, exercisesMap } = await loadLessonData();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return null;
  return mergeExercises(lesson, exercisesMap);
}

/**
 * 课程简要信息（用于列表页）
 */
export interface LessonSummary {
  id: number;
  title: string;
  type: 'new' | 'review';
  grammar: string;
  hasExercises: boolean;
}

export async function getLessonSummaries(): Promise<LessonSummary[]> {
  const { lessons, exercisesMap } = await loadLessonData();
  return lessons.map((l) => ({
    id: l.id,
    title: l.title,
    type: l.type,
    grammar: l.grammar,
    hasExercises:
      (l.content.exercises?.length ?? 0) > 0 || (exercisesMap[l.id]?.length ?? 0) > 0,
  }));
}

/**
 * 获取课程总数
 */
export async function getTotalLessonCount(): Promise<number> {
  const { lessons } = await loadLessonData();
  return lessons.length;
}
