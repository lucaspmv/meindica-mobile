import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
};

export { useAuth };
