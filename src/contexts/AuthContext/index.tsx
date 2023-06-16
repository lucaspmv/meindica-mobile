import { GetUserDataResponseDTO } from '@dtos/Google/GetUserDataResponseDTO';
import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { getItem, removeItem, setItem } from '@services/AsyncStorage';
import { loginService } from '@services/Users/login';
import { registerService } from '@services/Users/register';
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
  userType?: UserTypeEnum;
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
  const [userId, setUserId] = useState<string>();
  const [userType, setUserType] = useState<UserTypeEnum>();

  const isAuthenticated = useMemo(() => {
    return !!userId;
  }, [userId]);

  const login = useCallback(async (user: GetUserDataResponseDTO) => {
    try {
      const loginResponse = await loginService({
        googleId: user.id,
        email: user.email,
        name: user.name,
        avatar: user.picture,
      });

      if (loginResponse.userType) {
        await setItem(AsyncStorageKeyEnum.USER_TYPE, loginResponse.userType);
        setUserType(loginResponse.userType);
      }

      await setItem(AsyncStorageKeyEnum.USER_ID, loginResponse.userId);
      setUserId(loginResponse.userId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const register = useCallback(
    async (type: UserTypeEnum) => {
      try {
        if (userId) {
          await registerService({
            userId,
            type,
          });

          await setItem(AsyncStorageKeyEnum.USER_TYPE, type);
          setUserType(type);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [userId]
  );

  const logout = useCallback(async () => {
    await removeItem(AsyncStorageKeyEnum.USER_ID);
    await removeItem(AsyncStorageKeyEnum.USER_TYPE);

    setUserType(undefined);
    setUserId(undefined);
  }, []);

  useEffect(() => {
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
