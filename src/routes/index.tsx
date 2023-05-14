import { Box, useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { RegisterRoutes } from './register.routes';

const Routes = () => {
  const { isAuthenticated, userType } = useAuth();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.white;

  return (
    <Box flex={1} bg="white">
      <NavigationContainer theme={theme}>
        {!isAuthenticated ? (
          <AuthRoutes />
        ) : userType === undefined ? (
          <RegisterRoutes />
        ) : (
          <AppRoutes />
        )}
      </NavigationContainer>
    </Box>
  );
};

export { Routes };
