import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Divider } from 'native-base';

import { RegisterUserType } from '@screens/Register/subscreens/RegisterUserType';

import { RouteNameEnum } from '@enums/RouteNameEnum';
import { RegisterServiceProvider } from '@screens/Register/subscreens/RegisterServiceProvider';

type RegisterRoutesList = {
  [RouteNameEnum.REGISTER_USER_TYPE]: undefined;
  [RouteNameEnum.REGISTER_SERVICE_PROVIDER]: undefined;
};

export type RegisterNavigatorRoutesProps =
  NativeStackNavigationProp<RegisterRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<RegisterRoutesList>();

const RegisterRoutes = () => {
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
          name={RouteNameEnum.REGISTER_USER_TYPE}
          component={RegisterUserType}
        />
        <Screen
          name={RouteNameEnum.REGISTER_SERVICE_PROVIDER}
          component={RegisterServiceProvider}
        />
      </Navigator>
    </>
  );
};

export { RegisterRoutes };
