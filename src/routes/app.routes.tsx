import { RouteNameEnum } from '@enums/RouteNameEnum';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { BottomTabRoutes } from './bottom-tab.routes';
import { ServiceProviderActivityDetails } from '@screens/Explore/subscreens/ServiceProviderActivityDetails';

type AppRoutesList = {
  [RouteNameEnum.BOTTOM_TAB_NAVIGATOR]: undefined;
  [RouteNameEnum.SERVICE_PROVIDER_ACTIVITY_DETAILS]: {
    serviceProviderId: string;
  };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesList>();

const AppRoutes = () => {
  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name={RouteNameEnum.BOTTOM_TAB_NAVIGATOR}
          component={BottomTabRoutes}
        />
        <Screen
          name={RouteNameEnum.SERVICE_PROVIDER_ACTIVITY_DETAILS}
          component={ServiceProviderActivityDetails}
        />
      </Navigator>
    </>
  );
};

export { AppRoutes };
