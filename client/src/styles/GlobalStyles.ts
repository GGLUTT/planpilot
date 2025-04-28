import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-link-color: #2678b6;
    --tg-theme-button-color: #2678b6;
    --tg-theme-button-text-color: #ffffff;
    --tg-theme-secondary-bg-color: #f0f0f0;

    --primary-color: var(--tg-theme-button-color, #2678b6);
    --secondary-color: #30b6a4;
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --danger-color: #f44336;
    --text-color: var(--tg-theme-text-color, #000000);
    --bg-color: var(--tg-theme-bg-color, #ffffff);
    --secondary-bg-color: var(--tg-theme-secondary-bg-color, #f0f0f0);
    --hint-color: var(--tg-theme-hint-color, #999999);
    --link-color: var(--tg-theme-link-color, #2678b6);
    --button-color: var(--tg-theme-button-color, #2678b6);
    --button-text-color: var(--tg-theme-button-text-color, #ffffff);
    
    --border-radius: 8px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    --shadow-md: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
    
    --header-height: 56px;
    --footer-height: 48px;
    --max-content-width: 800px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: var(--font-size-md);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: var(--link-color);
    text-decoration: none;
  }

  button {
    background-color: var(--button-color);
    color: var(--button-text-color);
    border: none;
    border-radius: var(--border-radius);
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.9;
    }
    
    &:active {
      opacity: 0.8;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    background-color: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--hint-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-sm);
    font-size: var(--font-size-md);
    outline: none;
    
    &:focus {
      border-color: var(--primary-color);
    }
    
    &::placeholder {
      color: var(--hint-color);
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease forwards;
  }

  .slide-up {
    animation: slideUp 0.4s ease forwards;
  }

  .pulse {
    animation: pulse 1.5s ease infinite;
  }
`; 