import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';

interface MenuOption {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const TelegramMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showMainButton, hideMainButton, webApp, setMainButtonParams } = useTelegram();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuOptions: MenuOption[] = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'goals', label: 'Goals', icon: '🎯', path: '/goals' },
    { id: 'add', label: 'Add Goal', icon: '➕', path: '/add' },
    { id: 'calendar', label: 'Calendar', icon: '📅', path: '/calendar' },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
  ];
  
  // Get current page title
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentOption = menuOptions.find(option => option.path === currentPath);
    return currentOption ? `${currentOption.icon} ${currentOption.label}` : 'Menu';
  };
  
  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle menu item selection
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  useEffect(() => {
    // When component mounts, show the main button with menu
    if (webApp && webApp.MainButton) {
      const pageTitle = getCurrentPageTitle();
      setMainButtonParams({
        text: pageTitle,
        isVisible: true,
        isActive: true
      });
      webApp.MainButton.onClick(toggleMenu);
    } else {
      showMainButton('Menu', toggleMenu);
    }
    
    return () => {
      // Clean up when component unmounts
      hideMainButton();
    };
  }, []);
  
  // Update main button text based on current page
  useEffect(() => {
    if (webApp && webApp.MainButton) {
      const pageTitle = getCurrentPageTitle();
      setMainButtonParams({
        text: pageTitle
      });
    }
  }, [location.pathname, webApp]);
  
  if (!isMenuOpen) {
    return null;
  }
  
  return (
    <MenuContainer>
      <MenuOverlay onClick={toggleMenu} />
      <MenuContent>
        <MenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <CloseButton onClick={toggleMenu}>✕</CloseButton>
        </MenuHeader>
        
        <MenuItems>
          {menuOptions.map((option) => (
            <MenuItem 
              key={option.id}
              isActive={location.pathname === option.path}
              onClick={() => handleMenuItemClick(option.path)}
            >
              <MenuItemIcon>{option.icon}</MenuItemIcon>
              <MenuItemLabel>{option.label}</MenuItemLabel>
            </MenuItem>
          ))}
        </MenuItems>
      </MenuContent>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const MenuOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MenuContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-color);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md);
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
`;

const MenuTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-color);
  padding: 4px;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm);
  background-color: ${({ isActive }) => isActive ? 'var(--secondary-bg-color)' : 'transparent'};
  border-radius: var(--border-radius);
  cursor: pointer;
  
  &:hover {
    background-color: var(--secondary-bg-color);
  }
`;

const MenuItemIcon = styled.span`
  font-size: 20px;
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
`;

const MenuItemLabel = styled.span`
  font-size: var(--font-size-md);
  font-weight: 500;
`;

export default TelegramMenu; 