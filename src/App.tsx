import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { preloadVoices } from './services/tts';
import { logger } from './utils/logger';
import ErrorBoundary from './components/ErrorBoundary';
import LogViewer from './components/LogViewer';
import EyeProtectionModal from './components/EyeProtectionModal';
import './styles/index.css';

const MODULE = 'App';

/** 路由懒加载时的儿童风格加载页 */
const PageLoader: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF5E6 0%, #F5E6D3 100%)',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: '72px', marginBottom: '16px', animation: 'bounce 1s infinite' }}>
      🎓
    </div>
    <p style={{ fontSize: '20px', color: '#FF8C42', fontWeight: 600 }}>正在加载...</p>
  </div>
);

// 路由级代码分割：每个页面独立 chunk，按需加载
const Home = lazy(() => import('./pages/Home'));
const LessonList = lazy(() => import('./pages/LessonList'));
const LessonDetail = lazy(() => import('./pages/LessonDetail'));
const Progress = lazy(() => import('./pages/Progress'));
const PracticeCenter = lazy(() => import('./pages/PracticeCenter'));
const Report = lazy(() => import('./pages/Report'));

const App: React.FC = () => {
  useEffect(() => {
    logger.info(MODULE, '应用启动', '初始化TTS语音');
    // 初始化TTS语音
    preloadVoices()
      .then(() => {
        logger.success(MODULE, 'TTS初始化', 'TTS语音初始化完成');
      })
      .catch((err) => {
        logger.error(MODULE, 'TTS初始化', `TTS语音初始化失败: ${err}`);
      });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<LessonList />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/practice" element={<PracticeCenter />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #FFF5E6 0%, #F5E6D3 100%)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '80px', marginBottom: '24px' }}>🔍</div>
                  <h1 style={{ fontSize: '28px', color: '#FF8C42', marginBottom: '16px' }}>
                    页面不存在
                  </h1>
                  <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
                    找不到你要找的页面
                  </p>
                  <a
                    href="#/"
                    style={{
                      padding: '16px 48px',
                      background: 'linear-gradient(135deg, #FF8C42, #E6732A)',
                      color: 'white',
                      borderRadius: '16px',
                      fontSize: '20px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    🏠 返回首页
                  </a>
                </div>
              }
            />
          </Routes>
          </Suspense>

          {/* 日志查看器 */}
          <LogViewer maxLogs={100} position="bottom-right" />

          {/* 护眼提醒 */}
          <EyeProtectionModal />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
