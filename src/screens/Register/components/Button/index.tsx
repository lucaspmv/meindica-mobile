import {
  Center,
  IPressableProps,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

interface RegisterButtonProps extends IPressableProps {
  label: string;
  type?: 'primary' | 'secondary';
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  label,
  type = 'primary',
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      height={RFValue(56)}
      borderRadius={RFValue(15)}
      bg={type === 'primary' ? 'purple.500' : 'white'}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      shadow={type === 'secondary' ? 2 : 0}
      _disabled={{
        opacity: 0.6,
      }}
      style={{
        paddingLeft: RFValue(25),
        paddingRight: RFValue(12),
      }}
      {...rest}
    >
      <Text
        fontFamily="medium"
        fontSize={RFValue(16)}
        color={type === 'primary' ? 'white' : 'purple.600'}
      >
        {label}
      </Text>
      <Center
        p={RFValue(2)}
        backgroundColor={type === 'primary' ? 'purple.600' : 'white'}
        borderRadius={99999}
        borderWidth={RFValue(2)}
        borderColor="#576AFF"
      >
        <Ionicons
          name="arrow-forward"
          size={RFValue(20)}
          color={type === 'primary' ? 'white' : colors.purple[600]}
        />
      </Center>
    </Pressable>
  );
};

export { RegisterButton };
