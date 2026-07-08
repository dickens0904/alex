/**
 * NCE 课文角色性别映射数据库
 *
 * 根据新概念英语第一册~第三册课文中的角色，建立 speaker 标识与性别的对应关系。
 * TTS 朗读时根据此映射自动选择男声/女声。
 *
 * gender: 'male' | 'female' | 'neutral'
 *   - male: 男声（朗读用男声）
 *   - female: 女声（朗读用女声）
 *   - neutral: 中性/复数/旁白（使用女声作为默认旁白声）
 */

export interface SpeakerGenderInfo {
  gender: 'male' | 'female' | 'neutral';
  /** 中文备注，方便维护 */
  note: string;
}

/** 核心映射表：speaker 标识（大写） → 性别信息 */
const GENDER_MAP: Record<string, SpeakerGenderInfo> = {
  // ==================== 通用标识 ====================
  A: { gender: 'male', note: '默认男声，练习对话角色A' },
  B: { gender: 'female', note: '默认女声，练习对话角色B' },
  '': { gender: 'neutral', note: '旁白/叙述，使用女声' },

  // ==================== 角色描述（职业/身份） ====================
  MAN: { gender: 'male', note: '男人' },
  WOMAN: { gender: 'female', note: '女人' },
  BOY: { gender: 'male', note: '男孩' },
  GIRL: { gender: 'female', note: '女孩' },
  FATHER: { gender: 'male', note: '父亲' },
  MOTHER: { gender: 'female', note: '母亲' },
  GRANDMOTHER: { gender: 'female', note: '祖母' },
  GRANDFATHER: { gender: 'male', note: '祖父' },
  SON: { gender: 'male', note: '儿子' },
  DAUGHTER: { gender: 'female', note: '女儿' },
  HUSBAND: { gender: 'male', note: '丈夫' },
  WIFE: { gender: 'female', note: '妻子' },
  TEACHER: { gender: 'male', note: '老师（默认男声）' },
  STUDENTS: { gender: 'neutral', note: '学生们（复数，女声）' },
  GIRLS: { gender: 'female', note: '女孩们（复数）' },
  DOCTOR: { gender: 'male', note: '医生' },
  NURSE: { gender: 'female', note: '护士' },
  'CUSTOMS OFFICER': { gender: 'male', note: '海关官员' },
  POLICEMAN: { gender: 'male', note: '警察' },
  POLICEWOMAN: { gender: 'female', note: '女警' },
  BUTCHER: { gender: 'male', note: '肉贩' },
  BAKER: { gender: 'male', note: '面包师' },
  LADY: { gender: 'female', note: '女士' },
  'SHOP ASSISTANT': { gender: 'female', note: '店员（默认女声）' },
  ASSISTANT: { gender: 'female', note: '助理/店员（默认女声）' },
  CONDUCTOR: { gender: 'male', note: '售票员' },
  ATTENDANT: { gender: 'male', note: '服务员（默认男声）' },
  PORTER: { gender: 'male', note: '搬运工' },
  NARRATOR: { gender: 'neutral', note: '旁白' },
  REPORTER: { gender: 'male', note: '记者（默认男声）' },
  CUSTOMER: { gender: 'male', note: '顾客（默认男声）' },
  MANAGER: { gender: 'male', note: '经理（默认男声）' },
  BOSS: { gender: 'male', note: '老板' },
  'THE BOSS': { gender: 'male', note: '老板' },
  DRIVER: { gender: 'male', note: '司机' },
  WAITER: { gender: 'male', note: '男服务员' },
  WAITRESS: { gender: 'female', note: '女服务员' },
  STUDENT: { gender: 'neutral', note: '学生' },
  DENTIST: { gender: 'male', note: '牙医' },
  VETERINARIAN: { gender: 'male', note: '兽医' },
  CASHIER: { gender: 'female', note: '收银员' },
  SECRETARY: { gender: 'female', note: '秘书' },
  ENGINEER: { gender: 'male', note: '工程师' },
  MECHANIC: { gender: 'male', note: '机械师' },
  PILOT: { gender: 'male', note: '飞行员' },
  STEWARDESS: { gender: 'female', note: '空姐' },

  // ==================== 称呼前缀 ====================
  'MR.': { gender: 'male', note: '先生' },
  MR: { gender: 'male', note: '先生（无句点）' },
  'MRS.': { gender: 'female', note: '夫人' },
  MRS: { gender: 'female', note: '夫人（无句点）' },
  MISS: { gender: 'female', note: '小姐' },
  'MS.': { gender: 'female', note: '女士' },
  MS: { gender: 'female', note: '女士（无句点）' },
  SIR: { gender: 'male', note: '先生（尊称）' },
  MADAM: { gender: 'female', note: '夫人（尊称）' },

  // ==================== NCE 第一册具体人名 ====================
  // Lesson 5
  'MR. BLAKE': { gender: 'male', note: '布莱克先生' },
  'MR.BLAKE': { gender: 'male', note: '布莱克先生（无空格变体）' },
  HANS: { gender: 'male', note: '汉斯（德国男名）' },
  NAOKO: { gender: 'female', note: '直子（日本女名）' },
  'CHANG-WOO': { gender: 'male', note: '昌宇（韩国男名）' },
  LUMING: { gender: 'male', note: '路明（中国男名）' },
  XIAOHUI: { gender: 'female', note: '小慧（中国女名）' },

  // Lesson 7
  ROBERT: { gender: 'male', note: '罗伯特' },
  SOPHIE: { gender: 'female', note: '索菲' },

  // Lesson 9
  STEVEN: { gender: 'male', note: '史蒂文' },
  HELEN: { gender: 'female', note: '海伦' },

  // Lesson 11
  DAVE: { gender: 'male', note: '戴夫' },
  TIM: { gender: 'male', note: '蒂姆' },

  // Lesson 13
  LOUISE: { gender: 'female', note: '路易丝' },
  ANNA: { gender: 'female', note: '安娜' },

  // Lesson 17
  'MR. JACKSON': { gender: 'male', note: '杰克逊先生' },
  'MR. RICHARDS': { gender: 'male', note: '理查兹先生' },

  // Lesson 19
  'MRS. JONES': { gender: 'female', note: '琼斯夫人' },
  AMY: { gender: 'female', note: '艾米' },

  // Lesson 23
  JEAN: { gender: 'female', note: '琴' },
  JACK: { gender: 'male', note: '杰克' },

  // Lesson 37
  DAN: { gender: 'male', note: '丹' },
  GEORGE: { gender: 'male', note: '乔治' },

  // Lesson 39, 41, 45, 47
  SAM: { gender: 'male', note: '萨姆' },
  PENNY: { gender: 'female', note: '彭妮' },
  PAMELA: { gender: 'female', note: '帕梅拉' },
  CHRISTINE: { gender: 'female', note: '克里斯汀' },

  // Lesson 45
  BOB: { gender: 'male', note: '鲍勃' },

  // Lesson 47
  ANN: { gender: 'female', note: '安' },

  // Lesson 49
  'MRS. BIRD': { gender: 'female', note: '伯德夫人' },

  // Lesson 52
  DIMITRI: { gender: 'male', note: '迪米特里（希腊男名）' },

  // Lesson 53
  JIM: { gender: 'male', note: '吉姆' },

  // Lesson 61, 63, 65
  'MRS. WILLIAMS': { gender: 'female', note: '威廉姆斯夫人' },
  'MRS WILLIAMS': { gender: 'female', note: '威廉姆斯夫人（无句点变体）' },
  'MR. WILLIAMS': { gender: 'male', note: '威廉姆斯先生' },
  JILL: { gender: 'female', note: '吉尔' },

  // Lesson 67
  'MRS. JOHNSON': { gender: 'female', note: '约翰逊夫人' },

  // Lesson 71
  PAULINE: { gender: 'female', note: '波琳' },
  JANE: { gender: 'female', note: '简' },

  // Lesson 77
  'MR. CROFT': { gender: 'male', note: '克罗夫特先生' },

  // Lesson 79, 81, 83
  TOM: { gender: 'male', note: '汤姆' },
  CAROL: { gender: 'female', note: '卡罗尔' },

  // Lesson 85, 95
  KEN: { gender: 'male', note: '肯' },

  // Lesson 87
  'MRS. LEE': { gender: 'female', note: '李夫人' },
  'MR. LEE': { gender: 'male', note: '李先生' },

  // Lesson 89
  NIGEL: { gender: 'male', note: '奈杰尔' },
  IAN: { gender: 'male', note: '伊恩' },

  // Lesson 91
  JENNY: { gender: 'female', note: '珍妮' },
  CATHERINE: { gender: 'female', note: '凯瑟琳' },
  LINDA: { gender: 'female', note: '琳达' },

  // Lesson 97
  'MR. HALL': { gender: 'male', note: '霍尔先生' },

  // Lesson 99
  ANDY: { gender: 'male', note: '安迪' },
  LUCY: { gender: 'female', note: '露西' },

  // Lesson 101 (GRANDMOTHER 已在上方职业/身份部分定义)

  // Lesson 103
  GARY: { gender: 'male', note: '加里' },
  RICHARD: { gender: 'male', note: '理查德' },

  // Lesson 105
  'MR. JONES': { gender: 'male', note: '琼斯先生' },

  // Lesson 111
  CAROLINE: { gender: 'female', note: '卡罗琳' },

  // Lesson 115
  KATE: { gender: 'female', note: '凯特' },

  // Lesson 123
  BILL: { gender: 'male', note: '比尔' },

  // Lesson 125
  SUSAN: { gender: 'female', note: '苏珊' },

  // Lesson 127
  LIZ: { gender: 'female', note: '莉兹' },

  // Lesson 133, 135
  'MISS MARSH': { gender: 'female', note: '马什小姐' },

  // Lesson 137
  JULIE: { gender: 'female', note: '朱莉' },
  BRIAN: { gender: 'male', note: '布莱恩' },

  // Lesson 139
  'MR. TURNER': { gender: 'male', note: '特纳先生' },
  'JOHN SMITH': { gender: 'male', note: '约翰·史密斯' },

  // Lesson 131
  MARTIN: { gender: 'male', note: '马丁' },
  ROY: { gender: 'male', note: '罗伊' },
};

// ==================== 智能匹配规则 ====================

/**
 * 前缀匹配规则：从 speaker 标识中提取称呼前缀来判断性别
 * 按优先级从高到低匹配
 */
const PREFIX_RULES: Array<{ pattern: RegExp; gender: 'male' | 'female' }> = [
  { pattern: /^MRS[\s.]/i, gender: 'female' },
  { pattern: /^MISS[\s]/i, gender: 'female' },
  { pattern: /^MS[\s.]/i, gender: 'female' },
  { pattern: /^MR[\s.]/i, gender: 'male' },
];

// ==================== 公开 API ====================

/**
 * 查询角色性别
 * @param speaker speaker 标识（原始大小写均可，内部自动转大写匹配）
 * @returns 'male' | 'female' | 'neutral'
 */
export function getSpeakerGender(speaker: string): 'male' | 'female' | 'neutral' {
  if (!speaker) return 'neutral';

  const key = speaker.toUpperCase().trim();

  // 1. 精确匹配
  if (GENDER_MAP[key]) {
    return GENDER_MAP[key].gender;
  }

  // 2. 前缀规则匹配（处理 MR. XXX, MRS. XXX 等未收录的组合）
  for (const rule of PREFIX_RULES) {
    if (rule.pattern.test(key)) {
      return rule.gender;
    }
  }

  // 3. 检查是否包含已知前缀关键词
  if (key.startsWith('MR ') || key.startsWith('MR.')) return 'male';
  if (key.startsWith('MRS ') || key.startsWith('MRS.')) return 'female';
  if (key.startsWith('MISS ')) return 'female';
  if (key.startsWith('MS ') || key.startsWith('MS.')) return 'female';

  // 4. 未匹配到任何规则，默认使用女声（中性旁白）
  console.log(`[SpeakerGender] 未识别的 speaker: "${speaker}"，使用默认女声`);
  return 'neutral';
}

/**
 * 查询角色的详细信息
 */
export function getSpeakerInfo(speaker: string): SpeakerGenderInfo {
  if (!speaker) return { gender: 'neutral', note: '空speaker，旁白' };

  const key = speaker.toUpperCase().trim();
  const exact = GENDER_MAP[key];
  if (exact) return exact;

  const gender = getSpeakerGender(speaker);
  return { gender, note: `未收录，基于规则推断为 ${gender}` };
}

/**
 * 判断是否为已知的男性角色
 */
export function isMaleSpeaker(speaker: string): boolean {
  return getSpeakerGender(speaker) === 'male';
}

/**
 * 判断是否为已知的女性角色
 */
export function isFemaleSpeaker(speaker: string): boolean {
  return getSpeakerGender(speaker) === 'female';
}
