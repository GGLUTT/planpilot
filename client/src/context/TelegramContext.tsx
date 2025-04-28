import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramUser;
    auth_date?: string;
    hash?: string;
  };
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (fn: () => void) => void;
    offClick: () => void;
    setParams: (params: object) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
    offClick: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: string) => void;
    notificationOccurred: (type: string) => void;
    selectionChanged: () => void;
  };
  close: () => void;
  expand: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  [key: string]: any;
}

interface TelegramContextType {
  webApp: TelegramWebApp | null;
  telegramUser: TelegramUser | null;
  queryParams: URLSearchParams;
  isTelegramWebapp: boolean;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [queryParams] = useState<URLSearchParams>(new URLSearchParams(window.location.search));
  const [isTelegramWebapp, setIsTelegramWebapp] = useState<boolean>(false);

  useEffect(() => {
    // Get WebApp from window
    if (window.Telegram && window.Telegram.WebApp) {
      setWebApp(window.Telegram.WebApp);
      setIsTelegramWebapp(true);
      
      // Set expansion
      window.Telegram.WebApp.expand();
      
      // Get user info from WebApp
      if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        setTelegramUser(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } else {
      // Running outside of Telegram WebApp
      setIsTelegramWebapp(false);
      
      // Try to get user data from URL parameters for testing
      const mockUserId = queryParams.get('mockUser');
      if (mockUserId) {
        const mockUser: TelegramUser = {
          id: parseInt(mockUserId),
          first_name: queryParams.get('firstName') || 'Test',
          last_name: queryParams.get('lastName') || 'User',
          username: queryParams.get('username') || 'testuser',
          photo_url: queryParams.get('photoUrl') || undefined
        };
        setTelegramUser(mockUser);
      }
    }
  }, [queryParams]);

  return (
    <TelegramContext.Provider value={{ webApp, telegramUser, queryParams, isTelegramWebapp }}>
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

// Add this to the window object for TypeScript
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default TelegramContext; 