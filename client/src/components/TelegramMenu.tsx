import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '../context/TelegramContext';
import { useTheme } from '../context/ThemeContext';

const TelegramMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { webApp } = useTelegram();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Update active tab based on current location
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      setActiveTab('home');
    } else if (path.includes('/goals')) {
      setActiveTab('goals');
    } else if (path.includes('/stats')) {
      setActiveTab('stats');
    } else if (path.includes('/profile')) {
      setActiveTab('profile');
    }
  }, [location]);

  // Handle scroll to hide/show menu
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Set TG theme if available
  useEffect(() => {
    if (webApp?.themeParams) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', webApp.themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', webApp.themeParams.link_color || '#2678b6');
      document.documentElement.style.setProperty('--tg-theme-button-color', webApp.themeParams.button_color || '#2678b6');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', webApp.themeParams.button_text_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', webApp.themeParams.secondary_bg_color || '#f0f0f0');
    }
  }, [webApp]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'goals':
        navigate('/goals');
        break;
      case 'add':
        navigate('/add');
        break;
      case 'stats':
        navigate('/stats');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <AnimatePresence>
      <MenuContainer 
        as={motion.div}
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <MenuItem 
          active={activeTab === 'home'} 
          onClick={() => handleTabClick('home')}
        >
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <MenuText>Home</MenuText>
          </IconWrapper>
        </MenuItem>
        
        <MenuItem 
          active={activeTab === 'goals'} 
          onClick={() => handleTabClick('goals')}
        >
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <MenuText>Goals</MenuText>
          </IconWrapper>
        </MenuItem>
        
        <AddButton onClick={() => handleTabClick('add')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </AddButton>
        
        <MenuItem 
          active={activeTab === 'stats'} 
          onClick={() => handleTabClick('stats')}
        >
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <MenuText>Stats</MenuText>
          </IconWrapper>
        </MenuItem>
        
        <SettingsGroup>
          <ThemeToggle 
            onClick={toggleTheme} 
            isDark={theme === 'dark'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </ThemeToggle>
        </SettingsGroup>
      </MenuContainer>
    </AnimatePresence>
  );
};

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--bg-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 16px;
  border-top: 1px solid var(--border-color);
  transition: background-color var(--transition-speed) ease;
`;

const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ active }) => active ? 'var(--primary-color)' : 'var(--hint-color)'};
  transition: color 0.3s ease, background-color 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => active ? '24px' : '0'};
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const MenuText = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

const AddButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(38, 120, 182, 0.3);
  cursor: pointer;
  color: white;
  margin-bottom: 16px;
  transition: transform 0.2s ease, background-color 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SettingsGroup = styled.div`
  position: absolute;
  top: -30px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const ThemeToggle = styled.div<{ isDark: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isDark }) => isDark ? '#555' : '#f0f0f0'};
  color: ${({ isDark }) => isDark ? '#fff' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
  }
`;

export default TelegramMenu; 