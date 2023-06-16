import { Box, Image, Pressable, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '@hooks/useAuth';

import MapPinImage from '@assets/images/map-pin.png';

import { UserTypeEnum } from '@enums/UserTypeEnum';

const ServiceProviderCard: React.FC = () => {
  const { userType } = useAuth();

  return (
    <Pressable
      flexDirection="row"
      p={RFValue(10)}
      bgColor="white"
      shadow={1}
      borderRadius={RFValue(18)}
      _pressed={{
        opacity: 0.9,
      }}
    >
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        alt="Foto do Prestador de Serviço"
        w={RFValue(RFValue(79))}
        h={RFValue(92)}
        borderRadius={RFValue(10)}
        mr={RFValue(18)}
      />
      <Box justifyContent="space-between" flex={1}>
        <Box mb={RFValue(8 / 4)}>
          <Text
            fontFamily="semibold"
            color="purple.500"
            fontSize={RFValue(12)}
            numberOfLines={1}
          >
            PEDREIRO
          </Text>
          <Text
            fontFamily="medium"
            fontSize={RFValue(15)}
            color="#120D26"
            numberOfLines={2}
          >
            Lucas Porto
          </Text>
        </Box>
        <Box flexDir="row" alignItems="center">
          <Image
            source={MapPinImage}
            alt="Marcador de Mapa"
            mr={RFValue(8 / 4)}
          />
          <Text fontFamily="regular" fontSize={RFValue(12)} color="#747688">
            Asa Norte
          </Text>
        </Box>
      </Box>
      {userType === UserTypeEnum.CUSTOMER && (
        <FontAwesome name="heart-o" size={RFValue(18)} color="#313338" />
      )}
    </Pressable>
  );
};

export { ServiceProviderCard };
