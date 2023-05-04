import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Services } from '@screens/Services';

import { useAuth } from '@hooks/useAuth';

import { RouteNameEnum } from '@enums/RouteNameEnum';
import { UserTypeEnum } from '@enums/UserTypeEnum';

type AppRoutesList = {
  [RouteNameEnum.HOME]: undefined;
  [RouteNameEnum.SERVICES]: undefined;
  [RouteNameEnum.PROFILE]: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesList>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesList>();

const AppRoutes = () => {
  const { userType } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Screen name={RouteNameEnum.HOME} component={Home} />
      {userType === UserTypeEnum.SERVICE_PROVIDER && (
        <Screen name={RouteNameEnum.SERVICES} component={Services} />
      )}
      <Screen name={RouteNameEnum.PROFILE} component={Profile} />
    </Navigator>
  );
};

export { AppRoutes };
