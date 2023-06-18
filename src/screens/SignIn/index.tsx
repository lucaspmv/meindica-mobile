import { useCallback, useEffect, useState } from 'react';
import { Button, Center, HStack, Image, Text } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { RFValue } from 'react-native-responsive-fontsize';

import { getUserData } from '@services/Google/getUserData';

import { useAuth } from '@hooks/useAuth';

import LogoImage from '@assets/images/logo.png';
import GoogleLogoImage from '@assets/images/google-logo.png';

WebBrowser.maybeCompleteAuthSession();

const SignIn: React.FC = () => {
  const { login } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '406609768511-soa2flg4g8vk0o2660hpctmmq2od0fan.apps.googleusercontent.com',
  });

  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = useCallback(
    async (token: string) => {
      setIsLoading(true);

      try {
        const user = await getUserData(token);

        await login(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  useEffect(() => {
    if (response && response.type === 'success' && response.authentication) {
      getUserInfo(response.authentication.accessToken);
    }
  }, [getUserInfo, response]);

  return (
    <Center flex={1}>
      <Image source={LogoImage} alt="MEINDICA" />
      <Button
        onPress={() => promptAsync()}
        disabled={!request || isLoading}
        h={RFValue(56)}
        w="75%"
        borderRadius={RFValue(12)}
        backgroundColor="purple.500"
        isLoading={isLoading}
        _loading={{
          opacity: 1,
        }}
        _spinner={{
          color: '#FFFFFF',
          size: 'lg',
        }}
        style={{
          marginTop: RFValue(140),
        }}
      >
        <HStack alignItems="center">
          <Image source={GoogleLogoImage} alt="Google" />
          <Text
            fontFamily="body"
            fontSize={RFValue(16)}
            color="#FFFFFF"
            style={{
              marginLeft: RFValue(13),
            }}
          >
            Login com Google
          </Text>
        </HStack>
      </Button>
    </Center>
  );
};

export { SignIn };
