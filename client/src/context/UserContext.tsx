import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserContextType } from '../types';
import { getUser } from '../api/api';
import { useTelegram } from './TelegramContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { queryParams } = useTelegram();

  React.useEffect(() => {
    const fetchUser = async () => {
      const userId = queryParams.get('user');
      if (userId) {
        setIsLoading(true);
        try {
          const userData = await getUser(userId);
          setUser(userData);
          setError(null);
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('Failed to fetch user data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [queryParams, user]);

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