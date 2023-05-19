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
      height={RFValue(58)}
      pl={RFValue(25)}
      pr={RFValue(12)}
      borderRadius={RFValue(15)}
      bg={type === 'primary' ? 'purple.500' : 'white'}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      style={
        type === 'secondary'
          ? {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }
          : {}
      }
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
