import { useEffect } from 'react';
import { Button, Center, Text } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { getUserData } from '@services/Google/getUserData';

import { useAuth } from '@hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

const SignIn: React.FC = () => {
  const { login } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '406609768511-soa2flg4g8vk0o2660hpctmmq2od0fan.apps.googleusercontent.com',
  });

  const getUserInfo = async (token: string) => {
    try {
      const user = await getUserData(token);

      login(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response && response.type === 'success') {
      if (response.authentication) {
        getUserInfo(response.authentication.accessToken);
      }
    }
  }, [response]);

  return (
    <Center flex={1}>
      <Text
        fontFamily="heading"
        fontSize="4xl"
        color="white"
        textAlign="center"
      >
        MEINDICA
      </Text>

      <Button
        mt={30}
        background="red.500"
        onPress={() => promptAsync()}
        disabled={!request}
      >
        Entrar com Google
      </Button>
    </Center>
  );
};

export { SignIn };
