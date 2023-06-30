import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

import { Explore } from '@screens/Explore';
import { Profile } from '@screens/Profile';
import { Favorites } from '@screens/Favorites';
import { Schedule } from '@screens/Schedule';

import { RouteNameEnum } from '@enums/RouteNameEnum';
import { UserTypeEnum } from '@enums/UserTypeEnum';

import { useAuth } from '@hooks/useAuth';

type BottomTabRoutesList = {
  [RouteNameEnum.EXPLORE]: undefined;
  [RouteNameEnum.SCHEDULE]: undefined;
  [RouteNameEnum.FAVORITES]: undefined;
  [RouteNameEnum.PROFILE]: undefined;
};

export type BottomTabNavigatorRoutesProps =
  BottomTabNavigationProp<BottomTabRoutesList>;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabRoutesList>();

const BottomTabRoutes = () => {
  const { userType } = useAuth();
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.purple[700],
          tabBarInactiveTintColor: colors.gray[200],
          tabBarStyle: {
            marginHorizontal: RFValue(10),
            marginBottom: RFValue(14),
            borderRadius: RFValue(44),
            height: RFValue(60),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          },
          tabBarIcon: ({ color }) => {
            const faSize = RFValue(27.5);
            const miSize = RFValue(32.5);

            if (route.name === RouteNameEnum.EXPLORE) {
              return (
                <MaterialIcons name="explore" size={miSize} color={color} />
              );
            }
            if (route.name === RouteNameEnum.SCHEDULE) {
              return (
                <MaterialIcons
                  name="event-available"
                  size={miSize}
                  color={color}
                />
              );
            }
            if (route.name === RouteNameEnum.FAVORITES) {
              return <FontAwesome name="heart" size={faSize} color={color} />;
            }
            if (route.name === RouteNameEnum.PROFILE) {
              return <FontAwesome name="user" size={faSize} color={color} />;
            }
          },
        };
      }}
    >
      <Screen name={RouteNameEnum.EXPLORE} component={Explore} />
      {userType === UserTypeEnum.CUSTOMER ? (
        <Screen
          name={RouteNameEnum.FAVORITES}
          component={Favorites}
          options={{
            unmountOnBlur: true,
          }}
        />
      ) : (
        <Screen name={RouteNameEnum.SCHEDULE} component={Schedule} />
      )}
      <Screen name={RouteNameEnum.PROFILE} component={Profile} />
    </Navigator>
  );
};

export { BottomTabRoutes };
