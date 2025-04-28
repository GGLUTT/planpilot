import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramContextType {
  webApp: typeof WebApp | null;
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
  } | null;
  queryParams: URLSearchParams;
  isLoading: boolean;
  error: string | null;
  closeMiniApp: () => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string) => Promise<boolean>;
  openLink: (url: string) => void;
  expandApp: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  sendData: (data: any) => void;
  showMainButton: (text: string, callback: () => void) => void;
  hideMainButton: () => void;
  setMainButtonParams: (params: MainButtonParams) => void;
}

interface MainButtonParams {
  text?: string;
  color?: string;
  textColor?: string;
  isActive?: boolean;
  isVisible?: boolean;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<typeof WebApp | null>(null);
  const [user, setUser] = useState<TelegramContextType['user']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams] = useState<URLSearchParams>(new URLSearchParams(window.location.search));

  useEffect(() => {
    try {
      // Initialize Telegram Web App
      const tgWebApp = WebApp;
      
      // Expand to fullscreen mode by default
      tgWebApp.expand();
      
      // Get user data
      if (tgWebApp.initDataUnsafe?.user) {
        setUser(tgWebApp.initDataUnsafe.user);
      } else {
        // For development without actual WebApp we can get the user from query params
        const userId = queryParams.get('user');
        if (userId) {
          setUser({
            id: parseInt(userId, 10),
            first_name: 'Dev',
            last_name: 'User',
            username: 'dev_user',
          });
        }
      }
      
      // Configure MainButton with default styles
      if (tgWebApp.MainButton) {
        const themeParams = tgWebApp.themeParams || {};
        const buttonColor = themeParams.button_color || '#2481cc';
        const buttonTextColor = themeParams.button_text_color || '#ffffff';
        
        tgWebApp.MainButton.setParams({
          color: buttonColor,
          text_color: buttonTextColor,
        });
      }
      
      setWebApp(tgWebApp);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize Telegram Web App');
      setIsLoading(false);
      console.error('Failed to initialize Telegram Web App:', err);
    }
  }, [queryParams]);

  const closeMiniApp = () => {
    if (webApp) {
      webApp.close();
    }
  };

  const showAlert = (message: string) => {
    if (webApp) {
      webApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (webApp) {
        webApp.showConfirm(message, (confirmed) => {
          resolve(confirmed);
        });
      } else {
        resolve(window.confirm(message));
      }
    });
  };

  const openLink = (url: string) => {
    if (webApp) {
      webApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const expandApp = () => {
    if (webApp) {
      webApp.expand();
    }
  };

  const enableClosingConfirmation = () => {
    if (webApp) {
      webApp.enableClosingConfirmation();
    }
  };

  const disableClosingConfirmation = () => {
    if (webApp) {
      webApp.disableClosingConfirmation();
    }
  };

  const sendData = (data: any) => {
    if (webApp) {
      webApp.sendData(JSON.stringify(data));
    } else {
      console.log('Sending data to Telegram Bot:', data);
    }
  };
  
  const showMainButton = (text: string, callback: () => void) => {
    if (webApp && webApp.MainButton) {
      webApp.MainButton.setText(text);
      webApp.MainButton.onClick(callback);
      webApp.MainButton.show();
    } else {
      console.log('MainButton not available or in dev mode');
    }
  };
  
  const hideMainButton = () => {
    if (webApp && webApp.MainButton) {
      webApp.MainButton.hide();
    }
  };
  
  const setMainButtonParams = (params: MainButtonParams) => {
    if (webApp && webApp.MainButton) {
      const mainButtonParams: Record<string, any> = {};
      
      if (params.text) {
        mainButtonParams.text = params.text;
      }
      
      if (params.color) {
        mainButtonParams.color = params.color;
      }
      
      if (params.textColor) {
        mainButtonParams.text_color = params.textColor;
      }
      
      if (params.isActive !== undefined) {
        if (params.isActive) {
          webApp.MainButton.enable();
        } else {
          webApp.MainButton.disable();
        }
      }
      
      if (params.isVisible !== undefined) {
        if (params.isVisible) {
          webApp.MainButton.show();
        } else {
          webApp.MainButton.hide();
        }
      }
      
      if (Object.keys(mainButtonParams).length > 0) {
        webApp.MainButton.setParams(mainButtonParams);
      }
    }
  };

  const value = {
    webApp,
    user,
    queryParams,
    isLoading,
    error,
    closeMiniApp,
    showAlert,
    showConfirm,
    openLink,
    expandApp,
    enableClosingConfirmation,
    disableClosingConfirmation,
    sendData,
    showMainButton,
    hideMainButton,
    setMainButtonParams,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = (): TelegramContextType => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};

export default TelegramContext; 