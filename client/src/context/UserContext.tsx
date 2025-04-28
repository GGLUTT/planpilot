import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserContextType } from '../types';
import { getUser, createUser } from '../api/api';
import { useTelegram } from './TelegramContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

// Generate a random user ID
const generateUserId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { telegramUser, queryParams } = useTelegram();

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      setIsLoading(true);
      
      try {
        // Try to get user ID from query params or local storage
        let userId = queryParams.get('user');
        if (!userId) {
          userId = localStorage.getItem('userId');
        }

        if (userId) {
          try {
            // Try to fetch existing user
            const userData = await getUser(userId);
            setUser(userData);
            localStorage.setItem('userId', userId);
            setError(null);
            return;
          } catch (error) {
            console.warn('User not found, will create new one:', error);
            // If user not found, we'll create a new one below
          }
        }

        // If we need to create a new user
        if (telegramUser) {
          // Create user based on Telegram data
          const newUserId = generateUserId();
          const newUser = {
            userId: newUserId,
            username: telegramUser.username || 'user' + newUserId.substring(0, 4),
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            photoUrl: telegramUser.photo_url
          };
          
          const createdUser = await createUser(newUser);
          setUser(createdUser);
          localStorage.setItem('userId', createdUser.userId);
          setError(null);
        } else {
          // Create anonymous user if no Telegram data
          const newUserId = generateUserId();
          const newUser = {
            userId: newUserId,
            username: 'user' + newUserId.substring(0, 4),
            firstName: 'Anonymous',
            lastName: '',
            photoUrl: ''
          };
          
          const createdUser = await createUser(newUser);
          setUser(createdUser);
          localStorage.setItem('userId', createdUser.userId);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching/creating user:', error);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrCreateUser();
  }, [telegramUser, queryParams]);

  return (
    <UserContext.Provider value={{ user, isLoading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 