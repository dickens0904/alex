from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # 1. 测试首页
    print("=== 测试首页 ===")
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='test_home.png', full_page=True)
    print("首页截图已保存")
    
    # 检查首页元素
    home_title = page.title()
    print(f"页面标题: {home_title}")
    
    # 查找课程列表链接
    lesson_links = page.locator('text=课程列表').all()
    print(f"找到 {len(lesson_links)} 个'课程列表'链接")
    
    # 2. 点击课程列表
    if len(lesson_links) > 0:
        lesson_links[0].click()
        page.wait_for_load_state('networkidle')
        page.screenshot(path='test_lesson_list.png', full_page=True)
        print("\n=== 课程列表页面截图已保存 ===")
        
        # 3. 点击第一课
        first_lesson = page.locator('text=第1课').first
        if first_lesson:
            first_lesson.click()
            page.wait_for_load_state('networkidle')
            page.screenshot(path='test_lesson_detail.png', full_page=True)
            print("\n=== 课程详情页面截图已保存 ===")
            
            # 4. 点击语法标签
            grammar_tab = page.locator('text=语法').first
            if grammar_tab:
                grammar_tab.click()
                page.wait_for_timeout(1000)
                page.screenshot(path='test_grammar_tab.png', full_page=True)
                print("\n=== 语法标签页截图已保存 ===")
                
                # 5. 检查朗读按钮
                read_btns = page.locator('.read-btn').all()
                print(f"\n找到 {len(read_btns)} 个朗读按钮:")
                for i, btn in enumerate(read_btns):
                    text = btn.text_content()
                    print(f"  按钮 {i+1}: {text}")
                
                # 6. 检查朗读控制区域
                reading_controls = page.locator('.reading-controls').all()
                print(f"\n找到 {len(reading_controls)} 个朗读控制区域")
                
                # 7. 检查语法内容
                explanation = page.locator('.explanation-card').first
                if explanation:
                    print(f"\n语法讲解内容: {explanation.text_content()[:100]}...")
                
                # 8. 检查语法规则
                rules = page.locator('.rules-card').first
                if rules:
                    print(f"\n语法规则内容: {rules.text_content()[:100]}...")
                
                # 9. 检查例句
                examples_tab = page.locator('text=例句学习').first
                if examples_tab:
                    examples_tab.click()
                    page.wait_for_timeout(500)
                    page.screenshot(path='test_examples_tab.png', full_page=True)
                    print("\n=== 例句标签页截图已保存 ===")
                    
                    # 检查例句朗读按钮
                    example_speak_btns = page.locator('.speak-btn').all()
                    print(f"\n找到 {len(example_speak_btns)} 个例句朗读按钮")
                
                # 10. 检查练习标签
                exercises_tab = page.locator('text=语法练习').first
                if exercises_tab:
                    exercises_tab.click()
                    page.wait_for_timeout(500)
                    page.screenshot(path='test_exercises_tab.png', full_page=True)
                    print("\n=== 练习标签页截图已保存 ===")
                    
                    # 检查练习题
                    exercise_options = page.locator('.option-btn').all()
                    print(f"\n找到 {len(exercise_options)} 个练习选项")
    
    # 11. 检查控制台日志
    print("\n=== 检查控制台日志 ===")
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"{msg.type}: {msg.text}"))
    page.reload()
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    
    if console_logs:
        print("控制台日志:")
        for log in console_logs[:10]:  # 只显示前10条
            print(f"  {log}")
    else:
        print("无控制台日志")
    
    browser.close()
    print("\n=== 测试完成 ===")
