import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  user: '',
  setToken: (token: string) => {},
  setUser: (username: string) => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

