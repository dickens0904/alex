import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] 应用崩溃:', error, errorInfo);
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFF5E6 0%, #F5E6D3 100%)',
            fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>😅</div>
          <h1 style={{ fontSize: '28px', color: '#FF8C42', marginBottom: '16px' }}>
            哎呀，出了点小问题
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', maxWidth: '400px' }}>
            应用遇到了一些意外错误，不用担心！点击下方按钮返回首页重新开始吧。
          </p>
          <button
            onClick={this.handleGoHome}
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #FF8C42, #E6732A)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            🏠 返回首页
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
