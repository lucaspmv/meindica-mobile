import {
  Box,
  Divider,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { RegisterButton } from '@screens/Register/components/Button';

import SelectUserTypeImage from '@assets/images/select-user-type.png';

const RegisterUserType: React.FC = () => {
  const { register, logout } = useAuth();

  return (
    <View flex={1} backgroundColor="white" px={RFValue(20)} pb={RFValue(48)}>
      <Pressable
        onPress={logout}
        ml={-1}
        mr="auto"
        hitSlop={{
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <Ionicons name="arrow-back" size={RFValue(22.5)} color="black" />
      </Pressable>

      <VStack flex={1} justifyContent="space-between">
        <Box>
          <Text mt={RFValue(20)} fontFamily="medium" fontSize={RFValue(24)}>
            Primeiro passo
          </Text>
          <Text mt={RFValue(13)} fontFamily="regular" fontSize={RFValue(15)}>
            Para seguirmos com o seu cadastro, gostaríamos de saber se você está
            procurando algum serviço ou se você quer oferecer o seu serviço em
            nossa plataforma.
          </Text>
        </Box>
        <Image source={SelectUserTypeImage} alt="unDraw" mx="auto" />
        <VStack>
          <RegisterButton
            label="OFEREÇO SERVIÇOS"
            onPress={() => register(UserTypeEnum.SERVICE_PROVIDER)}
          />
          <Divider h={RFValue(4)} bg="white" />
          <RegisterButton label="PROCURO SERVIÇOS" type="secondary" />
        </VStack>
      </VStack>
    </View>
  );
};

export { RegisterUserType };
