import { GetUserDataResponseDTO } from '@dtos/Google/GetUserDataResponseDTO';
import { RegisterServiceProviderRequestDTO } from '@dtos/ServiceProviders/RegisterServiceProviderRequestDTO';

import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { getItem, removeItem, setItem } from '@services/AsyncStorage';
import { registerServiceProviderService } from '@services/ServiceProviders/registerServiceProvider';
import { loginService } from '@services/Users/login';

import { registerUserTypeService } from '@services/Users/registerUserType';
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
  login: (user: GetUserDataResponseDTO) => Promise<void>;
  logout: () => Promise<void>;
  registerUserType: (type: UserTypeEnum) => Promise<void>;
  registerServiceProvider: (
    data: RegisterServiceProviderRequestDTO
  ) => Promise<void>;
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
  }, []);

  const registerUserType = useCallback(
    async (type: UserTypeEnum) => {
      try {
        if (userId) {
          await registerUserTypeService({
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

  const registerServiceProvider = useCallback(
    async (data: RegisterServiceProviderRequestDTO) => {
      if (userId) {
        await registerServiceProviderService({ ...data, userId });

        await setItem(
          AsyncStorageKeyEnum.USER_TYPE,
          UserTypeEnum.SERVICE_PROVIDER
        );
        setUserType(UserTypeEnum.SERVICE_PROVIDER);
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
    getItem(AsyncStorageKeyEnum.USER_TYPE).then((value) => {
      if (value) {
        setUserType(value as UserTypeEnum);
      }
    });
    getItem(AsyncStorageKeyEnum.USER_ID).then((value) => {
      if (value) {
        setUserId(value);
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
        logout,
        registerUserType,
        registerServiceProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
