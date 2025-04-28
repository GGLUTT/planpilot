import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '../context/TelegramContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const TelegramMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { webApp } = useTelegram();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMainButton, setIsMainButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Set up main button based on route
  useEffect(() => {
    if (!webApp) return;

    const path = location.pathname;
    
    // Config for different routes
    if (path === '/') {
      webApp.MainButton.setText('Add New Goal');
      webApp.MainButton.show();
      setIsMainButton(true);
      
      webApp.MainButton.onClick(() => {
        navigate('/add');
      });
    } else if (path === '/add') {
      webApp.MainButton.setText('Save Goal');
      webApp.MainButton.show();
      setIsMainButton(true);
      
      // The form will handle the click event
    } else if (path.includes('/goals/')) {
      webApp.MainButton.setText('Add Task');
      webApp.MainButton.show();
      setIsMainButton(true);
      
      // The detail page will handle the click event
    } else if (path === '/profile/edit') {
      webApp.MainButton.setText('Save Profile');
      webApp.MainButton.show();
      setIsMainButton(true);
      
      // The form will handle the click event
    } else {
      webApp.MainButton.hide();
      setIsMainButton(false);
    }

    return () => {
      if (webApp) {
        webApp.MainButton.offClick();
      }
    };
  }, [webApp, location.pathname, navigate]);

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

  const handleAddGoal = () => {
    navigate('/add');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile/edit');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <BottomNavigation>
        <NavButton onClick={handleGoHome} active={location.pathname === '/'}>
          <NavIcon>🏠</NavIcon>
          <NavLabel>Home</NavLabel>
        </NavButton>
        
        {isMainButton ? (
          <MainButtonPlaceholder />
        ) : (
          <AddButton
            onClick={handleAddGoal}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>➕</span>
          </AddButton>
        )}
        
        <NavButton onClick={toggleMenu}>
          <NavIcon>⚙️</NavIcon>
          <NavLabel>Menu</NavLabel>
        </NavButton>
      </BottomNavigation>
      
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <MenuPanel
              as={motion.div}
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <MenuHeader>
                <MenuTitle>Menu</MenuTitle>
                <CloseButton onClick={() => setMenuOpen(false)}>✕</CloseButton>
              </MenuHeader>
              
              <MenuItems>
                <MenuItem onClick={handleViewProfile}>
                  {user?.photoUrl ? (
                    <MenuItemAvatar>
                      <img src={user.photoUrl} alt={user.firstName} />
                    </MenuItemAvatar>
                  ) : (
                    <MenuItemIcon>👤</MenuItemIcon>
                  )}
                  <MenuItemText>
                    <MenuItemTitle>Profile</MenuItemTitle>
                    <MenuItemDescription>View and edit your profile</MenuItemDescription>
                  </MenuItemText>
                </MenuItem>
                
                <MenuItem onClick={() => {
                  navigate('/goals');
                  setMenuOpen(false);
                }}>
                  <MenuItemIcon>🎯</MenuItemIcon>
                  <MenuItemText>
                    <MenuItemTitle>All Goals</MenuItemTitle>
                    <MenuItemDescription>View all your goals</MenuItemDescription>
                  </MenuItemText>
                </MenuItem>
                
                <MenuItem onClick={() => {
                  // Implement settings
                  setMenuOpen(false);
                }}>
                  <MenuItemIcon>⚙️</MenuItemIcon>
                  <MenuItemText>
                    <MenuItemTitle>Settings</MenuItemTitle>
                    <MenuItemDescription>App preferences</MenuItemDescription>
                  </MenuItemText>
                </MenuItem>
                
                <MenuItem onClick={() => {
                  // Implement help
                  setMenuOpen(false);
                }}>
                  <MenuItemIcon>❓</MenuItemIcon>
                  <MenuItemText>
                    <MenuItemTitle>Help</MenuItemTitle>
                    <MenuItemDescription>Get assistance</MenuItemDescription>
                  </MenuItemText>
                </MenuItem>
              </MenuItems>
              
              <MenuFooter>
                <AppVersion>PlanPilot v1.0.0</AppVersion>
              </MenuFooter>
            </MenuPanel>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const NavIcon = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const NavLabel = styled.span`
  font-size: 12px;
`;

const MainButtonPlaceholder = styled.div`
  width: 60px;
  height: 60px;
`;

const AddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MenuPanel = styled.div`
  background-color: var(--bg-color);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  max-height: 70vh;
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 16px;
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  
  &:hover {
    background-color: var(--secondary-bg-color);
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--secondary-bg-color);
  }
`;

const MenuItemIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
`;

const MenuItemAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuItemText = styled.div`
  flex: 1;
`;

const MenuItemTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const MenuItemDescription = styled.div`
  font-size: 12px;
  color: var(--hint-color);
`;

const MenuFooter = styled.div`
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
`;

const AppVersion = styled.div`
  font-size: 12px;
  color: var(--hint-color);
`;

export default TelegramMenu; 