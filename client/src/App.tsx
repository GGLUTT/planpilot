import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TelegramProvider } from './context/TelegramContext';
import { UserProvider } from './context/UserContext';
import { GoalsProvider } from './context/GoalsContext';
import { GlobalStyles } from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import { AppContainer, MainContent } from './styles/StyledComponents';

function App() {
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
              <Navigation />
            </AppContainer>
          </Router>
        </GoalsProvider>
      </UserProvider>
    </TelegramProvider>
  );
}

export default App;
