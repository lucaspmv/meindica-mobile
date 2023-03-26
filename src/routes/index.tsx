import { Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';

const Routes = () => {
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
};

export { Routes };
