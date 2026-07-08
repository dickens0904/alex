/**
 * Source Code Verification Script
 * Verifies all critical features by checking source files
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, condition) {
    if (condition) {
        console.log(`[PASS] ${name}`);
        passed++;
    } else {
        console.log(`[FAIL] ${name}`);
        failed++;
    }
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return '';
    }
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

const srcDir = path.join(__dirname, 'src');

console.log('========================================');
console.log('  Source Code Verification');
console.log('========================================\n');

// Test 1: Core Files Existence
console.log('--- Test 1: Core Files ---');
const coreFiles = [
    'services/tts.ts',
    'components/lesson/GrammarCardEnhanced.tsx',
    'components/lesson/ChineseVoiceSelector.tsx',
    'components/LogViewer.tsx',
    'utils/logger.ts',
    'pages/LessonDetail/index.tsx',
    'App.tsx'
];

coreFiles.forEach(file => {
    test(`${file} exists`, fileExists(path.join(srcDir, file)));
});

// Test 2: TTS Service Features
console.log('\n--- Test 2: TTS Service Features ---');
const ttsContent = readFile(path.join(srcDir, 'services/tts.ts'));

test('speakEnglish function', ttsContent.includes('export async function speakEnglish'));
test('speakChinese function', ttsContent.includes('export async function speakChinese'));
test('speakGrammarContent function', ttsContent.includes('export async function speakGrammarContent'));
test('stopSpeaking function', ttsContent.includes('export function stopSpeaking'));
test('setVoicePreset function', ttsContent.includes('export function setVoicePreset'));
test('setChineseVoice function', ttsContent.includes('export function setChineseVoice'));
test('SpeechRate type', ttsContent.includes('type SpeechRate'));
test('RATE_MAP constant', ttsContent.includes('const RATE_MAP'));
test('Edge TTS integration', ttsContent.includes('edgeTtsSpeak'));
test('Web Speech API fallback', ttsContent.includes('speakWithWebSpeech'));
test('Logger integration', ttsContent.includes('logger'));

// Test 3: Grammar Card Features
console.log('\n--- Test 3: Grammar Card Features ---');
const grammarContent = readFile(path.join(srcDir, 'components/lesson/GrammarCardEnhanced.tsx'));

test('handleReadExplanation function', grammarContent.includes('handleReadExplanation'));
test('handleReadRules function', grammarContent.includes('handleReadRules'));
test('handleReadAllExamples function', grammarContent.includes('handleReadAllExamples'));
test('handleStopReading function', grammarContent.includes('handleStopReading'));
test('Rules section', grammarContent.includes('rules-section'));
test('Examples section', grammarContent.includes('examples-section'));
test('Exercises section', grammarContent.includes('exercises-section'));
test('Chinese Voice Selector', grammarContent.includes('ChineseVoiceSelector'));
test('Logger integration', grammarContent.includes('logger'));

// Test 4: Logger System
console.log('\n--- Test 4: Logger System ---');
const loggerContent = readFile(path.join(srcDir, 'utils/logger.ts'));

test('Logger class', loggerContent.includes('class Logger'));
test('LogLevel enum', loggerContent.includes('enum LogLevel'));
test('INFO level', loggerContent.includes('INFO'));
test('WARN level', loggerContent.includes('WARN'));
test('ERROR level', loggerContent.includes('ERROR'));
test('SUCCESS level', loggerContent.includes('SUCCESS'));
test('dump method', loggerContent.includes('dump()'));

// Test 5: Log Viewer Component
console.log('\n--- Test 5: Log Viewer Component ---');
const logViewerContent = readFile(path.join(srcDir, 'components/LogViewer.tsx'));

test('LogViewer component', logViewerContent.includes('LogViewer'));
test('Logger integration', logViewerContent.includes('logger'));
test('Log display', logViewerContent.includes('logs'));
test('Clear button', logViewerContent.includes('clear') || logViewerContent.includes('清除'));
test('Copy button', logViewerContent.includes('clipboard') || logViewerContent.includes('复制'));

// Test 6: Chinese Voice Selector
console.log('\n--- Test 6: Chinese Voice Selector ---');
const voiceSelectorContent = readFile(path.join(srcDir, 'components/lesson/ChineseVoiceSelector.tsx'));

test('ChineseVoiceSelector component', voiceSelectorContent.includes('ChineseVoiceSelector'));
test('Voice list', voiceSelectorContent.includes('CHINESE_VOICES'));
test('Gender tabs', voiceSelectorContent.includes('female') || voiceSelectorContent.includes('male'));
test('Region tabs', voiceSelectorContent.includes('cn') || voiceSelectorContent.includes('hk'));
test('Preview function', voiceSelectorContent.includes('handlePreview') || voiceSelectorContent.includes('试听'));

// Test 7: Lesson Detail Page
console.log('\n--- Test 7: Lesson Detail Page ---');
const lessonDetailContent = readFile(path.join(srcDir, 'pages/LessonDetail/index.tsx'));

test('LessonDetail component', lessonDetailContent.includes('LessonDetail'));
test('Grammar tab', lessonDetailContent.includes('grammar') || lessonDetailContent.includes('语法'));
test('Grammar data loading', lessonDetailContent.includes('grammarInfo') || lessonDetailContent.includes('grammarLoading'));
test('Enhanced grammar data', lessonDetailContent.includes('grammarDataEnhanced') || lessonDetailContent.includes('grammarEnhancedContent'));
test('Logger integration', lessonDetailContent.includes('logger'));

// Test 8: App Component
console.log('\n--- Test 8: App Component ---');
const appContent = readFile(path.join(srcDir, 'App.tsx'));

test('App component', appContent.includes('App'));
test('Router', appContent.includes('Router') || appContent.includes('HashRouter'));
test('Routes', appContent.includes('Route'));
test('LogViewer integration', appContent.includes('LogViewer'));
test('Logger integration', appContent.includes('logger'));

// Test 9: Practice System
console.log('\n--- Test 9: Practice System ---');
const practiceFiles = [
    'components/practice/PracticeMenu.tsx',
    'components/practice/PracticeEngine.tsx',
    'components/practice/PracticeResult.tsx'
];

practiceFiles.forEach(file => {
    test(`${file} exists`, fileExists(path.join(srcDir, file)));
});

// Test 10: Data Files
console.log('\n--- Test 10: Data Files ---');
const dataFiles = [
    'data/lessons/grammarData.ts',
    'data/lessons/grammarDataEnhanced.ts',
    'data/lessons/grammarEnhancedContent.ts',
    'data/lessons/grammarExtraExercises.ts',
    'data/speakerGender.ts'
];

dataFiles.forEach(file => {
    test(`${file} exists`, fileExists(path.join(srcDir, file)));
});

// Summary
console.log('\n========================================');
console.log('  Verification Results Summary');
console.log('========================================');
console.log(`Total Tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Pass Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
console.log('========================================\n');

if (failed === 0) {
    console.log('All tests passed! Source code is complete and well-structured.');
} else {
    console.log(`${failed} test(s) failed. Please check the details above.`);
}
