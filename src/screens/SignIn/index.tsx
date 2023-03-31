import { useEffect, useState } from 'react';
import { Button, Center, Text } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getUserData } from '@services/Google/getUserData';
import { GetUserDataResponseDTO } from '@dtos/Google/getUserDataResponseDTO';

WebBrowser.maybeCompleteAuthSession();

const SignIn: React.FC = () => {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState<GetUserDataResponseDTO>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '406609768511-soa2flg4g8vk0o2660hpctmmq2od0fan.apps.googleusercontent.com',
  });

  const getUserInfo = async () => {
    try {
      const user = await getUserData(token);

      setUserInfo(user);
    } catch (error) {
      console.log(error);
      // Add your own error handler here
    }
  };

  useEffect(() => {
    if (response && response.type === 'success') {
      if (response.authentication) {
        setToken(response.authentication.accessToken);
        getUserInfo();
      }
    }
  }, [response, token]);

  return (
    <Center flex={1}>
      {!!userInfo && (
        <Text color="white" mb={5} fontSize="xl">
          Olá {userInfo.given_name}
        </Text>
      )}

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
