/**
 * 课程数据服务
 * 合并课程内容和自动生成的练习题，提供统一的数据访问接口
 */
import completeLessons from '../data/lessons/completeLessons';
import { exercisesMap } from '../data/lessons/generatedExercises';

/**
 * 获取合并了练习题的完整课程数据
 * 优先使用自动生成的练习题（格式更完整、题型更丰富）
 */
export function getAllLessons() {
  return completeLessons.map((lesson) => {
    const generatedExercises = exercisesMap[lesson.id] || [];
    const existingExercises = lesson.content.exercises || [];

    // 优先使用自动生成的练习题（格式更完整），如果没有则回退到原有数据
    const exercises = generatedExercises.length > 0 ? generatedExercises : existingExercises;

    return {
      ...lesson,
      content: {
        ...lesson.content,
        exercises,
      },
    };
  });
}

/**
 * 根据 ID 获取单课数据（含练习题）
 */
export function getLessonById(id: number) {
  const lesson = completeLessons.find((l) => l.id === id);
  if (!lesson) return null;

  const generatedExercises = exercisesMap[lesson.id] || [];
  const existingExercises = lesson.content.exercises || [];
  const exercises = generatedExercises.length > 0 ? generatedExercises : existingExercises;

  return {
    ...lesson,
    content: {
      ...lesson.content,
      exercises,
    },
  };
}

/**
 * 获取课程简要信息（用于列表页）
 */
export function getLessonSummaries() {
  return completeLessons.map((l) => ({
    id: l.id,
    title: l.title,
    type: l.type,
    grammar: l.grammar,
    hasExercises: l.content.exercises?.length > 0 || exercisesMap[l.id]?.length > 0,
  }));
}

/**
 * 获取课程总数
 */
export function getTotalLessonCount(): number {
  return completeLessons.length;
}
