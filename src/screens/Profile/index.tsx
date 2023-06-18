import { useAuth } from '@hooks/useAuth';
import { Button, Center } from 'native-base';

const Profile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Center flex={1}>
      <Button background="purple.500" onPress={logout} w="60%">
        Sair
      </Button>
    </Center>
  );
};

export { Profile };
