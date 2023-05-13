import { GetUserDataResponseDTO } from '@dtos/Google/GetUserDataResponseDTO';
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
  isRegistrationCompleted: boolean;
  userId?: string;
  userType: UserTypeEnum;
  register: (type: UserTypeEnum) => Promise<void>;
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
  const [userType, setUserType] = useState<UserTypeEnum>(
    UserTypeEnum.NOT_FILLED
  );
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);

  const isAuthenticated = useMemo(() => {
    return !!token;
  }, [token]);

  const login = useCallback(async (user: GetUserDataResponseDTO) => {
    try {
      // Aqui será feita a requisição de login para a api
      await setItem(
        AsyncStorageKeyEnum.TOKEN,
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIifQ.HLkw6rgYSwcv0sE69OKiNQFvHoo-6VqlxC5nKuMmftg'
      );
      await setItem(AsyncStorageKeyEnum.USER_ID, user.id);
      await setItem(AsyncStorageKeyEnum.IS_REGISTRATION_COMPLETED, false);

      setToken(
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIifQ.HLkw6rgYSwcv0sE69OKiNQFvHoo-6VqlxC5nKuMmftg'
      );
      setIsRegistrationCompleted(false);
      setUserId(user.id);
      setUserType(UserTypeEnum.NOT_FILLED);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const register = useCallback(async (type: UserTypeEnum) => {
    try {
      // req para completar cadastro

      await setItem(AsyncStorageKeyEnum.IS_REGISTRATION_COMPLETED, true);
      await setItem(AsyncStorageKeyEnum.USER_TYPE, type);

      setIsRegistrationCompleted(true);
      setUserType(type);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(async () => {
    await removeItem(AsyncStorageKeyEnum.TOKEN);
    await removeItem(AsyncStorageKeyEnum.IS_REGISTRATION_COMPLETED);
    await removeItem(AsyncStorageKeyEnum.USER_ID);
    await removeItem(AsyncStorageKeyEnum.USER_TYPE);

    setToken(undefined);
    setIsRegistrationCompleted(false);
    setUserType(UserTypeEnum.NOT_FILLED);
    setUserId(undefined);
  }, []);

  useEffect(() => {
    getItem(AsyncStorageKeyEnum.TOKEN).then((value) => {
      if (value) {
        setToken(value);
      }
    });
    getItem<boolean>(AsyncStorageKeyEnum.IS_REGISTRATION_COMPLETED).then(
      (value) => {
        if (value) {
          setIsRegistrationCompleted(value);
        }
      }
    );
    getItem(AsyncStorageKeyEnum.USER_ID).then((value) => {
      if (value) {
        setUserId(value);
      }
    });
    getItem(AsyncStorageKeyEnum.USER_TYPE).then((value) => {
      if (value) {
        setUserType(value as UserTypeEnum);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRegistrationCompleted,
        userId,
        userType,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
