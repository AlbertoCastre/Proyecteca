// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ClienteAxios from '../config/axios'; // Asegúrate de que esta ruta sea correcta

export interface User {
  id: number;
  name: string;
  email: string;
  googleId: string;
  rol: number; 
  profileImageUrl?: string; 
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.googleId) {
        try {
          const response = await ClienteAxios.get(`/user-role/${user.googleId}`);
          if (response.data) {
            setUser(prevUser => prevUser ? { ...prevUser, rol: response.data.rol_id } : null);
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
        }
      }
    };

    fetchUserRole();
  }, [user?.googleId]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
