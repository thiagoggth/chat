'use client';
import { KeyStorage } from '@/constants/KayStorage';
import api from '@/services/api';
import authService, { LoginDtoInput } from '@/services/authService';
import notify from '@/services/notify';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
};

export type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(login: LoginDtoInput): Promise<void>;
  signOut(): void;
  setUser(user: User): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { storedUser, storedToken } = getAuthItemsFromLocalStorage();
    console.log('TEste');
    function loadStorageData() {
      if (storedUser && storedToken) {
        const parsedUser: User = JSON.parse(storedUser);
        const parsedToken: string = JSON.parse(storedToken);

        setDefaultHeaderToken(parsedToken);
        setUser(parsedUser);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (login: LoginDtoInput) => {
    const response = await authService.login(login);
    const { data } = response;
    const { token } = data;

    setUser(response.data.user);
    saveTokenInLocalStorage(token);
    setDefaultHeaderToken(token);
  };

  const signOut = () => {
    setUser(null);
    cleanAuthItemsFromLocalStorage();
  };

  const cleanAuthItemsFromLocalStorage = () => {
    localStorage.removeItem(KeyStorage.LOCAL_KEY_USER);
    localStorage.removeItem(KeyStorage.LOCAL_KEY_TOKEN);
  };

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(KeyStorage.LOCAL_KEY_USER, JSON.stringify(user));
  }, [user]);

  const setDefaultHeaderToken = (token: string) => {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;

    api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error?.response?.status === 401) {
          notify.error('Login expirado');
          signOut();
        }
        return Promise.reject(error);
      }
    );
  };

  const saveTokenInLocalStorage = (token: string) => {
    localStorage.setItem(KeyStorage.LOCAL_KEY_TOKEN, JSON.stringify(token));
  };

  const getAuthItemsFromLocalStorage = () => {
    const storedUser = localStorage.getItem(KeyStorage.LOCAL_KEY_USER);
    const storedToken = localStorage.getItem(KeyStorage.LOCAL_KEY_TOKEN);

    return { storedUser, storedToken };
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
