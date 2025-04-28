import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';

/**
 * Hook to handle Telegram BackButton functionality
 * @param showOnPaths - Array of paths where the back button should be shown (except home path)
 * @param homePath - The home path where back button should be hidden
 */
export const useTelegramBackButton = (showOnPaths: string[] = [], homePath = '/') => {
  const { webApp } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Only proceed if webApp is available and initialized
    if (!webApp || !webApp.BackButton) return;
    
    const currentPath = location.pathname;
    
    // Check if we should show back button on this path
    const shouldShowBackButton = 
      currentPath !== homePath && 
      (showOnPaths.length === 0 || showOnPaths.includes(currentPath));
    
    if (shouldShowBackButton) {
      // Show back button and set up the click handler
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(-1);
      });
    } else {
      // Hide back button on home or non-specified paths
      webApp.BackButton.hide();
    }
    
    return () => {
      // Clean up event handler when component unmounts
      if (webApp.BackButton) {
        webApp.BackButton.offClick();
      }
    };
  }, [webApp, location.pathname, navigate, homePath, showOnPaths]);
}; 