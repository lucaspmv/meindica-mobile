import { Box, Divider, Image, Text, VStack, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { RegisterButton } from '@screens/Register/components/Button';

import SelectUserTypeImage from '@assets/images/select-user-type.png';
import { ButtonBack } from '@screens/Register/components/ButtonBack';
import { RouteNameEnum } from '@enums/RouteNameEnum';
import { RegisterNavigatorRoutesProps } from '@routes/register.routes';

const RegisterUserType: React.FC = () => {
  const { navigate } = useNavigation<RegisterNavigatorRoutesProps>();
  const { register, logout } = useAuth();

  return (
    <View flex={1} px={RFValue(20)} pb={RFValue(48)}>
      <ButtonBack onPress={logout} />
      <VStack
        flex={1}
        justifyContent="space-between"
        style={{
          marginTop: RFValue(15),
        }}
      >
        <Box>
          <Text fontFamily="medium" fontSize={RFValue(24)}>
            Primeiro passo
          </Text>
          <Text
            fontFamily="regular"
            fontSize={RFValue(15)}
            style={{
              marginTop: RFValue(13),
            }}
          >
            Para seguirmos com o seu cadastro, gostaríamos de saber se você está
            procurando algum serviço ou se você quer oferecer o seu serviço em
            nossa plataforma.
          </Text>
        </Box>
        <Image source={SelectUserTypeImage} alt="unDraw" mx="auto" />
        <VStack>
          <RegisterButton
            label="OFEREÇO SERVIÇOS"
            // onPress={() => register(UserTypeEnum.SERVICE_PROVIDER)}
            onPress={() => navigate(RouteNameEnum.REGISTER_SERVICE_PROVIDER)}
          />
          <Divider h={RFValue(16)} bg="white" />
          <RegisterButton
            label="PROCURO SERVIÇOS"
            type="secondary"
            onPress={() => register(UserTypeEnum.CUSTOMER)}
          />
        </VStack>
      </VStack>
    </View>
  );
};

export { RegisterUserType };
