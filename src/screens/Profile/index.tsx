import { useAuth } from '@hooks/useAuth';
import { Button, Center } from 'native-base';

const Profile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Center flex={1}>
      <Button background="purple.500" onPress={logout} px={100}>
        Sair
      </Button>
    </Center>
  );
};

export { Profile };
