import { Button, Center, Text } from 'native-base';

const SignIn: React.FC = () => {
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

      <Button mt={30} background="red.500" onPress={() => {}}>
        Entrar com Google
      </Button>
    </Center>
  );
};

export { SignIn };
