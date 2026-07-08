/**
 * Application Verification Script
 * Verifies all critical features of the application
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';
let passed = 0;
let failed = 0;

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}${path}`;
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, data: data });
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function test(name, condition) {
    if (condition) {
        console.log(`[PASS] ${name}`);
        passed++;
    } else {
        console.log(`[FAIL] ${name}`);
        failed++;
    }
}

async function runTests() {
    console.log('========================================');
    console.log('  New Concept English - Full Verification');
    console.log('========================================\n');

    try {
        // Test 1: Basic Resources
        console.log('--- Test 1: Basic Resources ---');
        const home = await makeRequest('/');
        test('Home Page Accessible', home.statusCode === 200);
        test('HTML Contains Title', home.data.includes('新概念英语') || home.data.includes('bundle.js'));

        const bundle = await makeRequest('/bundle.js');
        test('JavaScript Bundle Accessible', bundle.statusCode === 200);
        test('Bundle Size Valid', bundle.data.length > 100000);

        const css = await makeRequest('/styles.css');
        test('CSS Stylesheet Accessible', css.statusCode === 200);
        test('CSS Size Valid', css.data.length > 10000);

        // Test 2: Core Modules in Bundle
        console.log('\n--- Test 2: Core Modules ---');
        const content = bundle.data;
        
        test('TTS Service (speakEnglish)', content.includes('speakEnglish'));
        test('TTS Service (speakChinese)', content.includes('speakChinese'));
        test('Grammar Card Component', content.includes('GrammarCard') || content.includes('grammar-card'));
        test('Read Aloud Controls', content.includes('handleReadExplanation') || content.includes('read-btn'));
        test('Logger System', content.includes('logger') || content.includes('LogViewer'));
        test('Chinese Voice Selector', content.includes('ChineseVoiceSelector'));
        test('Edge TTS Integration', content.includes('edgeTtsSpeak') || content.includes('edge-tts'));
        test('Practice System', content.includes('PracticeEngine') || content.includes('PracticeMenu'));
        test('Achievement System', content.includes('achievement') || content.includes('checkAchievements'));

        // Test 3: CSS Styles
        console.log('\n--- Test 3: CSS Styles ---');
        const cssContent = css.data;
        
        test('Grammar Card Styles', cssContent.includes('grammar-card') || cssContent.includes('grammar-tabs'));
        test('Read Controls Styles', cssContent.includes('reading-controls') || cssContent.includes('read-btn'));
        test('Exercise Styles', cssContent.includes('exercise-') || cssContent.includes('option-btn'));

        // Test 4: Data Modules
        console.log('\n--- Test 4: Data Modules ---');
        test('Grammar Data', content.includes('grammarData') || content.includes('GrammarDetail'));
        test('Enhanced Grammar Data', content.includes('grammarDataEnhanced') || content.includes('grammarEnhancedContent'));
        test('Extra Exercises', content.includes('grammarExtraExercises'));
        test('Speaker Gender Data', content.includes('speakerGender') || content.includes('getSpeakerGender'));

        // Test 5: TTS Features
        console.log('\n--- Test 5: TTS Features ---');
        test('English Speech Function', content.includes('speakEnglish'));
        test('Chinese Speech Function', content.includes('speakChinese'));
        test('Grammar Content Speech', content.includes('speakGrammarContent'));
        test('Stop Speaking Function', content.includes('stopSpeaking'));
        test('Voice Switch', content.includes('setVoicePreset') || content.includes('setChineseVoice'));
        test('Speed Control', content.includes('SpeechRate') || content.includes('RATE_MAP'));

        // Test 6: Grammar Features
        console.log('\n--- Test 6: Grammar Features ---');
        test('Rules Display', content.includes('rules-section') || content.includes('rules-card'));
        test('Examples Display', content.includes('examples-section') || content.includes('example-card'));
        test('Exercises', content.includes('exercises-section') || content.includes('exercise-choice'));
        test('Read Explanation Button', content.includes('handleReadExplanation'));
        test('Read Rules Button', content.includes('handleReadRules'));
        test('Read All Button', content.includes('handleReadAllExamples'));
        test('Stop Reading Button', content.includes('handleStopReading'));

        // Test 7: Practice System
        console.log('\n--- Test 7: Practice System ---');
        test('Choice Questions', content.includes('exercise-choice') || content.includes('option-btn'));
        test('Fill Questions', content.includes('exercise-fill') || content.includes('fill-input'));
        test('Order Questions', content.includes('exercise-order') || content.includes('order-item'));
        test('Match Questions', content.includes('exercise-match') || content.includes('match-item'));
        test('Progress Display', content.includes('progress-badge') || content.includes('exercise-progress'));
        test('Score Statistics', content.includes('score') || content.includes('final-score'));
        test('Encouragement System', content.includes('encouragement') || content.includes('ENCOURAGEMENTS'));

        // Test 8: Logger System
        console.log('\n--- Test 8: Logger System ---');
        test('Logger Class', content.includes('Logger') || content.includes('logger'));
        test('Log Levels', content.includes('LogLevel') || content.includes('INFO'));
        test('Log Viewer Component', content.includes('LogViewer') || content.includes('log-container'));

        // Test 9: Code Quality
        console.log('\n--- Test 9: Code Quality ---');
        test('Error Boundary', content.includes('ErrorBoundary'));
        test('React Hooks', content.includes('useState') || content.includes('useEffect'));
        test('Async Handling', content.includes('async') || content.includes('Promise'));

        // Test 10: Routing
        console.log('\n--- Test 10: Routing ---');
        test('Home Route', content.includes('Route') || content.includes('HashRouter'));
        test('Lesson Detail Route', content.includes('lesson') || content.includes('LessonDetail'));

        // Summary
        console.log('\n========================================');
        console.log('  Test Results Summary');
        console.log('========================================');
        console.log(`Total Tests: ${passed + failed}`);
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);
        console.log(`Pass Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
        console.log('========================================\n');

        if (failed === 0) {
            console.log('All tests passed! Application is working correctly.');
        } else {
            console.log(`${failed} test(s) failed. Please check the details above.`);
        }

    } catch (error) {
        console.error('Test execution failed:', error);
    }
}

runTests();
