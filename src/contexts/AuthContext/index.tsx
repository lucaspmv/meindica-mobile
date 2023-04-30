import { GetUserDataResponseDTO } from '@dtos/Google/getUserDataResponseDTO';
import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { getItem, removeItem, setItem } from '@services/AsyncStorage';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextDataProps {
  isAuthenticated: boolean;
  userId?: string;
  userType: UserTypeEnum;
  login: (user: GetUserDataResponseDTO) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [userType] = useState<UserTypeEnum>(UserTypeEnum.SERVICE_PROVIDER);

  const isAuthenticated = useMemo(() => {
    return !!token;
  }, [token]);

  const login = useCallback(async (user: GetUserDataResponseDTO) => {
    try {
      // Aqui será feito a requisição de login para a api
      await setItem(
        AsyncStorageKeyEnum.TOKEN,
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIifQ.HLkw6rgYSwcv0sE69OKiNQFvHoo-6VqlxC5nKuMmftg'
      );

      setToken(
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIifQ.HLkw6rgYSwcv0sE69OKiNQFvHoo-6VqlxC5nKuMmftg'
      );
      setUserId(user.id);
      // setUserType(UserTypeEnum.CUSTOMER);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(async () => {
    await removeItem(AsyncStorageKeyEnum.TOKEN);

    setToken(undefined);
    setUserId(undefined);
  }, []);

  useEffect(() => {
    getItem(AsyncStorageKeyEnum.TOKEN).then((value) => {
      if (value) {
        setToken(value);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
