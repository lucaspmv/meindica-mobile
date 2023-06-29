import { Box, Image, Pressable, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '@hooks/useAuth';

import MapPinImage from '@assets/images/map-pin.png';

import { UserTypeEnum } from '@enums/UserTypeEnum';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { RouteNameEnum } from '@enums/RouteNameEnum';

interface ServiceProviderCardProps {
  serviceProviderId: string;
  image: string;
  name: string;
  publicName?: string;
  activityName: string;
  city: string;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  serviceProviderId,
  image,
  name,
  publicName,
  activityName,
  city,
}) => {
  const { userType } = useAuth();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Pressable
      onPress={() =>
        navigate(RouteNameEnum.SERVICE_PROVIDER_ACTIVITY_DETAILS, {
          serviceProviderId,
        })
      }
      flexDirection="row"
      bgColor="white"
      shadow={1}
      borderRadius={RFValue(18)}
      _pressed={{
        opacity: 0.9,
      }}
      style={{
        padding: RFValue(10),
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        alt="Foto do Prestador de Serviço"
        w={RFValue(RFValue(79))}
        h={RFValue(92)}
        borderRadius={RFValue(10)}
        style={{
          marginRight: RFValue(18),
        }}
      />
      <Box justifyContent="space-between" flex={1}>
        <Box
          style={{
            marginBottom: RFValue(8),
          }}
        >
          <Text
            fontFamily="semibold"
            color="purple.500"
            fontSize={RFValue(12)}
            numberOfLines={1}
            maxW="95%"
          >
            {activityName.toLocaleUpperCase()}
          </Text>
          <Text
            fontFamily="medium"
            fontSize={RFValue(15)}
            color="#120D26"
            numberOfLines={2}
          >
            {publicName ?? name}
          </Text>
        </Box>
        <Box flexDir="row" alignItems="center">
          <Image
            source={MapPinImage}
            alt="Marcador de Mapa"
            style={{
              marginRight: RFValue(8),
            }}
          />
          <Text fontFamily="regular" fontSize={RFValue(12)} color="#747688">
            {city}
          </Text>
        </Box>
      </Box>
      {userType === UserTypeEnum.CUSTOMER && (
        <FontAwesome
          name="heart-o"
          size={RFValue(18)}
          color="#313338"
          style={{ opacity: 0.6 }}
        />
      )}
    </Pressable>
  );
};

export { ServiceProviderCard };
