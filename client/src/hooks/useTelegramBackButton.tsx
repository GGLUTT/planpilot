import { useEffect } from 'react';
import { useTelegram } from '../context/TelegramContext';

/**
 * Hook for handling the Telegram WebApp BackButton
 * @param callback Function to execute when the back button is pressed
 */
const useTelegramBackButton = (callback: () => void) => {
  const { webApp } = useTelegram();

  useEffect(() => {
    if (webApp && webApp.BackButton) {
      // Show the back button
      webApp.BackButton.show();
      
      // Set the callback function
      webApp.BackButton.onClick(callback);
      
      // Cleanup when component unmounts
      return () => {
        webApp.BackButton.offClick(callback);
        webApp.BackButton.hide();
      };
    }
  }, [webApp, callback]);
};

export default useTelegramBackButton; 