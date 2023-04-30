import { useAuth } from '@hooks/useAuth';
import { Button, Center, Text } from 'native-base';

const Profile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Center flex={1}>
      <Text color="white">PERFIL</Text>
      <Button mt={30} background="fuchsia.600" onPress={logout} px={100}>
        Sair
      </Button>
    </Center>
  );
};

export { Profile };
