import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';

type AuthRoutesList = {
  signIn: undefined;
};

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesList>();

const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
};

export { AuthRoutes };
