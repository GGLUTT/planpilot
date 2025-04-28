import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TelegramProvider } from './context/TelegramContext';
import { UserProvider } from './context/UserContext';
import { GoalsProvider } from './context/GoalsContext';
import { GlobalStyles } from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import TelegramMenu from './components/TelegramMenu';
import { AppContainer } from './styles/StyledComponents';

function App() {
  // Make sure the webapp is expanded to fullscreen
  useEffect(() => {
    // Add viewport meta tag to ensure proper mobile rendering
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Add body styles for Telegram Mini App
    document.body.style.overscrollBehavior = 'none';
    document.body.style.backgroundColor = 'var(--bg-color, #ffffff)';
  }, []);

  return (
    <TelegramProvider>
      <UserProvider>
        <GoalsProvider>
          <Router>
            <GlobalStyles />
            <AppContainer>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Add more routes here for other pages */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <TelegramMenu />
            </AppContainer>
          </Router>
        </GoalsProvider>
      </UserProvider>
    </TelegramProvider>
  );
}

export default App;
