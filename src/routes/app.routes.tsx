import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Services } from '@screens/Services';

import { RouteNameEnum } from '@enums/RouteNameEnum';

type AppRoutesList = {
  [RouteNameEnum.HOME]: undefined;
  [RouteNameEnum.SERVICES]: undefined;
  [RouteNameEnum.PROFILE]: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesList>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesList>();

const AppRoutes = () => {
  const { type } = { type: 'costumer' };

  return (
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Screen name={RouteNameEnum.HOME} component={Home} />
      {type === 'mei' && (
        <Screen name={RouteNameEnum.SERVICES} component={Services} />
      )}
      <Screen name={RouteNameEnum.PROFILE} component={Profile} />
    </Navigator>
  );
};

export { AppRoutes };
