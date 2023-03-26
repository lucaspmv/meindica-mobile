import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';

import { RouteNameEnum } from '@enums/RouteNameEnum';

type AuthRoutesList = {
  [RouteNameEnum.SIGN_IN]: undefined;
};

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesList>();

const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={RouteNameEnum.SIGN_IN} component={SignIn} />
    </Navigator>
  );
};

export { AuthRoutes };
