import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavContainer>
      <NavItems>
        <NavItem
          onClick={() => navigate('/')}
          isActive={isActive('/')}
          as={motion.div}
          whileTap={{ scale: 0.9 }}
        >
          <NavIcon>🏠</NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        
        <NavItem
          onClick={() => navigate('/goals')}
          isActive={isActive('/goals')}
          as={motion.div}
          whileTap={{ scale: 0.9 }}
        >
          <NavIcon>🎯</NavIcon>
          <NavText>Goals</NavText>
        </NavItem>
        
        <NavItem
          onClick={() => navigate('/add')}
          isAdd
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AddButton>+</AddButton>
        </NavItem>
        
        <NavItem
          onClick={() => navigate('/calendar')}
          isActive={isActive('/calendar')}
          as={motion.div}
          whileTap={{ scale: 0.9 }}
        >
          <NavIcon>📅</NavIcon>
          <NavText>Calendar</NavText>
        </NavItem>
        
        <NavItem
          onClick={() => navigate('/profile')}
          isActive={isActive('/profile')}
          as={motion.div}
          whileTap={{ scale: 0.9 }}
        >
          <NavIcon>👤</NavIcon>
          <NavText>Profile</NavText>
        </NavItem>
      </NavItems>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--footer-height);
  background-color: var(--bg-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 var(--spacing-sm);
`;

const NavItem = styled.div<{ isActive?: boolean; isAdd?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: ${({ isAdd }) => (isAdd ? '0 0 auto' : '1')};
  height: 100%;
  cursor: pointer;
  position: relative;
  padding: ${({ isAdd }) => (isAdd ? '0' : 'var(--spacing-xs) 0')};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ isActive }) => (isActive ? '24px' : '0')};
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 3px 3px 0 0;
    transition: width 0.2s ease;
  }
`;

const NavIcon = styled.span`
  font-size: 20px;
  margin-bottom: 2px;
`;

const NavText = styled.span`
  font-size: var(--font-size-xs);
  font-weight: 500;
`;

const AddButton = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 8px;
`;

export default Navigation; 