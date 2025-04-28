import styled from 'styled-components';
import { motion } from 'framer-motion';

// Layout Components
export const Container = styled.div`
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--spacing-md);
  width: 100%;
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-xxl); /* Space for Telegram's MainButton */
`;

export const Header = styled.header`
  height: var(--header-height);
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
`;

export const MainContent = styled.main`
  flex: 1;
  padding-bottom: var(--spacing-xl);
`;

export const Footer = styled.footer`
  height: var(--footer-height);
  background-color: var(--bg-color);
  border-top: 1px solid var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

export const Section = styled.section`
  margin: var(--spacing-md) 0;
`;

export const Flex = styled.div<{
  direction?: string;
  justify?: string;
  align?: string;
  gap?: string;
  wrap?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  gap: ${({ gap }) => gap || 'var(--spacing-md)'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
`;

export const Grid = styled.div<{
  columns?: string;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || 'repeat(auto-fill, minmax(250px, 1fr))'};
  gap: ${({ gap }) => gap || 'var(--spacing-md)'};
`;

// Typography Components
export const Title = styled.h1`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
`;

export const Subtitle = styled.h2`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-sm);
`;

export const SmallText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--hint-color);
`;

// Input Components
export const Input = styled.input`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--hint-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-md);
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(38, 120, 182, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--hint-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-md);
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(38, 120, 182, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--hint-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-md);
  background-color: var(--bg-color);
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(38, 120, 182, 0.2);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  font-size: var(--font-size-md);
`;

export const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

// Button Components
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ size }) => {
    if (size === 'sm') return 'padding: 6px 12px; font-size: var(--font-size-sm);';
    if (size === 'lg') return 'padding: 12px 24px; font-size: var(--font-size-lg);';
    return 'padding: 8px 16px; font-size: var(--font-size-md);';
  }}
  
  ${({ variant }) => {
    if (variant === 'secondary') {
      return `
        background-color: var(--secondary-color);
        color: white;
        &:hover {
          background-color: rgba(48, 182, 164, 0.9);
        }
      `;
    }
    if (variant === 'success') {
      return `
        background-color: var(--success-color);
        color: white;
        &:hover {
          background-color: rgba(76, 175, 80, 0.9);
        }
      `;
    }
    if (variant === 'warning') {
      return `
        background-color: var(--warning-color);
        color: white;
        &:hover {
          background-color: rgba(255, 152, 0, 0.9);
        }
      `;
    }
    if (variant === 'danger') {
      return `
        background-color: var(--danger-color);
        color: white;
        &:hover {
          background-color: rgba(244, 67, 54, 0.9);
        }
      `;
    }
    if (variant === 'outline') {
      return `
        background-color: transparent;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        &:hover {
          background-color: rgba(38, 120, 182, 0.1);
        }
      `;
    }
    return `
      background-color: var(--primary-color);
      color: white;
      &:hover {
        background-color: rgba(38, 120, 182, 0.9);
      }
    `;
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-bg-color);
  }
`;

// Card Components
export const Card = styled.div`
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const CardHeader = styled.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardContent = styled.div`
  padding: var(--spacing-md);
`;

export const CardFooter = styled.div`
  padding: var(--spacing-md);
  border-top: 1px solid var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
`;

// Animation Components
export const MotionDiv = styled(motion.div)``;

export const MotionCard = styled(motion.div)`
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

// Status Indicators
export const Badge = styled.span<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  
  ${({ variant }) => {
    if (variant === 'secondary') return 'background-color: var(--secondary-color); color: white;';
    if (variant === 'success') return 'background-color: var(--success-color); color: white;';
    if (variant === 'warning') return 'background-color: var(--warning-color); color: white;';
    if (variant === 'danger') return 'background-color: var(--danger-color); color: white;';
    return 'background-color: var(--primary-color); color: white;';
  }}
`;

export const Avatar = styled.div<{
  size?: 'sm' | 'md' | 'lg';
}>`
  background-color: var(--secondary-bg-color);
  border-radius: 50%;
  overflow: hidden;
  
  ${({ size }) => {
    if (size === 'sm') return 'width: 32px; height: 32px;';
    if (size === 'lg') return 'width: 64px; height: 64px;';
    return 'width: 48px; height: 48px;';
  }}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Divider
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--secondary-bg-color);
  margin: var(--spacing-md) 0;
`;

// Loading indicators
export const Loader = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid var(--secondary-bg-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl) 0;
`;

// Empty states
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl) 0;
  gap: var(--spacing-md);
  
  svg {
    color: var(--hint-color);
    font-size: 48px;
  }
`; 