import { Divider } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RouteNameEnum } from '@enums/RouteNameEnum';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { BottomTabRoutes } from './bottom-tab.routes';

type AppRoutesList = {
  [RouteNameEnum.BOTTOM_TAB_NAVIGATOR]: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesList>();

const AppRoutes = () => {
  return (
    <>
      <Divider
        bgColor="transparent"
        style={{
          height: RFValue(getStatusBarHeight()),
        }}
      />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name={RouteNameEnum.BOTTOM_TAB_NAVIGATOR}
          component={BottomTabRoutes}
        />
      </Navigator>
    </>
  );
};

export { AppRoutes };
