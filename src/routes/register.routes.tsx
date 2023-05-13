import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { RegisterUserType } from '@screens/Register/subscreens/RegisterUserType';

import { RouteNameEnum } from '@enums/RouteNameEnum';
import { View } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type RegisterRoutesList = {
  [RouteNameEnum.REGISTER_USER_TYPE]: undefined;
};

export type RegisterNavigatorRoutesProps =
  NativeStackNavigationProp<RegisterRoutesList>;

const { Navigator, Screen } = createNativeStackNavigator<RegisterRoutesList>();

const RegisterRoutes = () => {
  // req para puxar dados e descobrir qual rota deve ser a inicial

  return (
    <>
      <View height={RFValue(getStatusBarHeight())} />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name={RouteNameEnum.REGISTER_USER_TYPE}
          component={RegisterUserType}
        />
      </Navigator>
    </>
  );
};

export { RegisterRoutes };
