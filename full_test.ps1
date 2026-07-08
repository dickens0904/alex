# New Concept English Practice - Full Function Verification Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   New Concept English - Full Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"
$testResults = @()
$passedCount = 0
$failedCount = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [int]$ExpectedStatus = 200
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 5
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Host "[PASS] $Name" -ForegroundColor Green
            return @{ Name = $Name; Status = "PASS"; Details = "Status: $($response.StatusCode)" }
        } else {
            Write-Host "[FAIL] $Name - Status: $($response.StatusCode)" -ForegroundColor Red
            return @{ Name = $Name; Status = "FAIL"; Details = "Expected $ExpectedStatus, got $($response.StatusCode)" }
        }
    } catch {
        Write-Host "[FAIL] $Name - Error: $_" -ForegroundColor Red
        return @{ Name = $Name; Status = "FAIL"; Details = $_.ToString() }
    }
}

function Test-Content {
    param(
        [string]$Name,
        [string]$Url,
        [string]$SearchText
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -TimeoutSec 10
        if ($response.Content -match $SearchText) {
            Write-Host "[PASS] $Name" -ForegroundColor Green
            return @{ Name = $Name; Status = "PASS"; Details = "Found: $SearchText" }
        } else {
            Write-Host "[FAIL] $Name - Not found: $SearchText" -ForegroundColor Red
            return @{ Name = $Name; Status = "FAIL"; Details = "Not found: $SearchText" }
        }
    } catch {
        Write-Host "[FAIL] $Name - Error: $_" -ForegroundColor Red
        return @{ Name = $Name; Status = "FAIL"; Details = $_.ToString() }
    }
}

# ========================================
# Test 1: Basic Resource Accessibility
# ========================================
Write-Host "`n--- Test 1: Basic Resource Accessibility ---" -ForegroundColor Yellow

$testResults += Test-Endpoint "Home Page" "$baseUrl/"
$testResults += Test-Endpoint "JavaScript Bundle" "$baseUrl/bundle.js"
$testResults += Test-Endpoint "CSS Stylesheet" "$baseUrl/styles.css"
$testResults += Test-Endpoint "HTML Entry" "$baseUrl/index.html"

# ========================================
# Test 2: Application Module Check
# ========================================
Write-Host "`n--- Test 2: Application Module Check ---" -ForegroundColor Yellow

$bundleResponse = Invoke-WebRequest -Uri "$baseUrl/bundle.js" -TimeoutSec 15
$bundleContent = $bundleResponse.Content

# Check core modules
$coreModules = @(
    @{ Name = "TTS Service"; Pattern = "speakEnglish|speakChinese" },
    @{ Name = "Grammar Card Component"; Pattern = "GrammarCard|grammar-card" },
    @{ Name = "Read Aloud Controls"; Pattern = "handleReadExplanation|read-btn" },
    @{ Name = "Logger System"; Pattern = "logger|LogViewer" },
    @{ Name = "Chinese Voice Selector"; Pattern = "ChineseVoiceSelector" },
    @{ Name = "Edge TTS Integration"; Pattern = "edgeTtsSpeak|edge-tts" },
    @{ Name = "Practice System"; Pattern = "PracticeEngine|PracticeMenu" },
    @{ Name = "Achievement System"; Pattern = "achievement|checkAchievements" }
)

foreach ($module in $coreModules) {
    if ($bundleContent -match $module.Pattern) {
        Write-Host "[PASS] $($module.Name)" -ForegroundColor Green
        $testResults += @{ Name = $module.Name; Status = "PASS"; Details = "Found pattern" }
    } else {
        Write-Host "[FAIL] $($module.Name)" -ForegroundColor Red
        $testResults += @{ Name = $module.Name; Status = "FAIL"; Details = "Pattern not found" }
    }
}

# ========================================
# Test 3: CSS Style Completeness
# ========================================
Write-Host "`n--- Test 3: CSS Style Completeness ---" -ForegroundColor Yellow

$cssResponse = Invoke-WebRequest -Uri "$baseUrl/styles.css" -TimeoutSec 10
$cssContent = $cssResponse.Content

$cssModules = @(
    @{ Name = "Grammar Card Styles"; Pattern = "grammar-card|grammar-tabs" },
    @{ Name = "Read Controls Styles"; Pattern = "reading-controls|read-btn" },
    @{ Name = "Exercise Styles"; Pattern = "exercise-|option-btn" },
    @{ Name = "Responsive Design"; Pattern = "@media|responsive" }
)

foreach ($module in $cssModules) {
    if ($cssContent -match $module.Pattern) {
        Write-Host "[PASS] $($module.Name)" -ForegroundColor Green
        $testResults += @{ Name = $module.Name; Status = "PASS"; Details = "CSS found" }
    } else {
        Write-Host "[FAIL] $($module.Name)" -ForegroundColor Red
        $testResults += @{ Name = $module.Name; Status = "FAIL"; Details = "CSS not found" }
    }
}

# ========================================
# Test 4: Page Route Check
# ========================================
Write-Host "`n--- Test 4: Page Route Check ---" -ForegroundColor Yellow

if ($bundleContent -match "Route.*path.*=.*Home|HashRouter") {
    Write-Host "[PASS] Home Route" -ForegroundColor Green
    $testResults += @{ Name = "Home Route"; Status = "PASS"; Details = "Route configured" }
} else {
    Write-Host "[FAIL] Home Route" -ForegroundColor Red
    $testResults += @{ Name = "Home Route"; Status = "FAIL"; Details = "Route not found" }
}

if ($bundleContent -match "lesson.*LessonDetail|lesson/:id") {
    Write-Host "[PASS] Lesson Detail Route" -ForegroundColor Green
    $testResults += @{ Name = "Lesson Detail Route"; Status = "PASS"; Details = "Route configured" }
} else {
    Write-Host "[FAIL] Lesson Detail Route" -ForegroundColor Red
    $testResults += @{ Name = "Lesson Detail Route"; Status = "FAIL"; Details = "Route not found" }
}

# ========================================
# Test 5: Data Module Check
# ========================================
Write-Host "`n--- Test 5: Data Module Check ---" -ForegroundColor Yellow

$dataModules = @(
    @{ Name = "Grammar Data"; Pattern = "grammarData|GrammarDetail" },
    @{ Name = "Enhanced Grammar Data"; Pattern = "grammarDataEnhanced|grammarEnhancedContent" },
    @{ Name = "Extra Exercises"; Pattern = "grammarExtraExercises" },
    @{ Name = "Speaker Gender Data"; Pattern = "speakerGender|getSpeakerGender" }
)

foreach ($module in $dataModules) {
    if ($bundleContent -match $module.Pattern) {
        Write-Host "[PASS] $($module.Name)" -ForegroundColor Green
        $testResults += @{ Name = $module.Name; Status = "PASS"; Details = "Data module found" }
    } else {
        Write-Host "[FAIL] $($module.Name)" -ForegroundColor Red
        $testResults += @{ Name = $module.Name; Status = "FAIL"; Details = "Data module not found" }
    }
}

# ========================================
# Test 6: TTS Feature Deep Check
# ========================================
Write-Host "`n--- Test 6: TTS Feature Deep Check ---" -ForegroundColor Yellow

$ttsFeatures = @(
    @{ Name = "English Speech"; Pattern = "speakEnglish" },
    @{ Name = "Chinese Speech"; Pattern = "speakChinese" },
    @{ Name = "Grammar Content Speech"; Pattern = "speakGrammarContent" },
    @{ Name = "Stop Speaking"; Pattern = "stopSpeaking" },
    @{ Name = "Voice Switch"; Pattern = "setVoicePreset|setChineseVoice" },
    @{ Name = "Speed Control"; Pattern = "SpeechRate|RATE_MAP" }
)

foreach ($feature in $ttsFeatures) {
    if ($bundleContent -match $feature.Pattern) {
        Write-Host "[PASS] $($feature.Name)" -ForegroundColor Green
        $testResults += @{ Name = $feature.Name; Status = "PASS"; Details = "TTS feature found" }
    } else {
        Write-Host "[FAIL] $($feature.Name)" -ForegroundColor Red
        $testResults += @{ Name = $feature.Name; Status = "FAIL"; Details = "TTS feature not found" }
    }
}

# ========================================
# Test 7: Grammar Feature Check
# ========================================
Write-Host "`n--- Test 7: Grammar Feature Check ---" -ForegroundColor Yellow

$grammarFeatures = @(
    @{ Name = "Rules Display"; Pattern = "rules-section|rules-card" },
    @{ Name = "Examples Display"; Pattern = "examples-section|example-card" },
    @{ Name = "Exercises"; Pattern = "exercises-section|exercise-choice" },
    @{ Name = "Read Explanation Button"; Pattern = "handleReadExplanation" },
    @{ Name = "Read Rules Button"; Pattern = "handleReadRules" },
    @{ Name = "Read All Button"; Pattern = "handleReadAllExamples" },
    @{ Name = "Stop Reading Button"; Pattern = "handleStopReading" },
    @{ Name = "Chinese Voice Selector"; Pattern = "ChineseVoiceSelector" }
)

foreach ($feature in $grammarFeatures) {
    if ($bundleContent -match $feature.Pattern) {
        Write-Host "[PASS] $($feature.Name)" -ForegroundColor Green
        $testResults += @{ Name = $feature.Name; Status = "PASS"; Details = "Grammar feature found" }
    } else {
        Write-Host "[FAIL] $($feature.Name)" -ForegroundColor Red
        $testResults += @{ Name = $feature.Name; Status = "FAIL"; Details = "Grammar feature not found" }
    }
}

# ========================================
# Test 8: Practice System Check
# ========================================
Write-Host "`n--- Test 8: Practice System Check ---" -ForegroundColor Yellow

$practiceFeatures = @(
    @{ Name = "Choice Questions"; Pattern = "exercise-choice|option-btn" },
    @{ Name = "Fill Questions"; Pattern = "exercise-fill|fill-input" },
    @{ Name = "Order Questions"; Pattern = "exercise-order|order-item" },
    @{ Name = "Match Questions"; Pattern = "exercise-match|match-item" },
    @{ Name = "Progress Display"; Pattern = "progress-badge|exercise-progress" },
    @{ Name = "Score Statistics"; Pattern = "score|final-score" },
    @{ Name = "Encouragement"; Pattern = "encouragement|ENCOURAGEMENTS" }
)

foreach ($feature in $practiceFeatures) {
    if ($bundleContent -match $feature.Pattern) {
        Write-Host "[PASS] $($feature.Name)" -ForegroundColor Green
        $testResults += @{ Name = $feature.Name; Status = "PASS"; Details = "Practice feature found" }
    } else {
        Write-Host "[FAIL] $($feature.Name)" -ForegroundColor Red
        $testResults += @{ Name = $feature.Name; Status = "FAIL"; Details = "Practice feature not found" }
    }
}

# ========================================
# Test 9: Logger System Check
# ========================================
Write-Host "`n--- Test 9: Logger System Check ---" -ForegroundColor Yellow

$loggerFeatures = @(
    @{ Name = "Logger Class"; Pattern = "class Logger|Logger" },
    @{ Name = "Log Levels"; Pattern = "LogLevel|INFO.*WARN.*ERROR" },
    @{ Name = "Log Viewer"; Pattern = "LogViewer|log-container" },
    @{ Name = "Log Export"; Pattern = "dump|clipboard" }
)

foreach ($feature in $loggerFeatures) {
    if ($bundleContent -match $feature.Pattern) {
        Write-Host "[PASS] $($feature.Name)" -ForegroundColor Green
        $testResults += @{ Name = $feature.Name; Status = "PASS"; Details = "Logger feature found" }
    } else {
        Write-Host "[FAIL] $($feature.Name)" -ForegroundColor Red
        $testResults += @{ Name = $feature.Name; Status = "FAIL"; Details = "Logger feature not found" }
    }
}

# ========================================
# Test 10: Code Quality Check
# ========================================
Write-Host "`n--- Test 10: Code Quality Check ---" -ForegroundColor Yellow

$codeQuality = @(
    @{ Name = "Error Boundary"; Pattern = "ErrorBoundary" },
    @{ Name = "Type Definitions"; Pattern = "GrammarDetail|Lesson" },
    @{ Name = "React Hooks"; Pattern = "useState|useEffect|useRef" },
    @{ Name = "Async Handling"; Pattern = "async|await|Promise" }
)

foreach ($quality in $codeQuality) {
    if ($bundleContent -match $quality.Pattern) {
        Write-Host "[PASS] $($quality.Name)" -ForegroundColor Green
        $testResults += @{ Name = $quality.Name; Status = "PASS"; Details = "Code quality check passed" }
    } else {
        Write-Host "[FAIL] $($quality.Name)" -ForegroundColor Red
        $testResults += @{ Name = $quality.Name; Status = "FAIL"; Details = "Code quality check failed" }
    }
}

# ========================================
# Test Results Summary
# ========================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Test Results Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$passedCount = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failedCount = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$warnCount = ($testResults | Where-Object { $_.Status -eq "WARN" }).Count

Write-Host "`nTotal Tests: $($testResults.Count)" -ForegroundColor White
Write-Host "Passed: $passedCount" -ForegroundColor Green
Write-Host "Failed: $failedCount" -ForegroundColor Red
Write-Host "Warnings: $warnCount" -ForegroundColor Yellow

$passRate = [math]::Round(($passedCount / $testResults.Count) * 100, 1)
Write-Host "`nPass Rate: $passRate%" -ForegroundColor $(if ($passRate -ge 80) { "Green" } elseif ($passRate -ge 60) { "Yellow" } else { "Red" })

# Output failed tests
if ($failedCount -gt 0) {
    Write-Host "`n--- Failed Tests ---" -ForegroundColor Red
    $testResults | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
        Write-Host "  - $($_.Name): $($_.Details)" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Test Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Return test results
return $testResults
