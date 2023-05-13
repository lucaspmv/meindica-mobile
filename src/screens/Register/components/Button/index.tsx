import { Center, IPressableProps, Pressable, Text } from 'native-base';
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
  return (
    <Pressable
      height={RFValue(58)}
      pl={RFValue(25)}
      pr={RFValue(12)}
      borderRadius={RFValue(15)}
      bg={type === 'primary' ? '#5669FF' : 'white'}
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
        color={type === 'primary' ? 'white' : '#3D56F0'}
      >
        {label}
      </Text>
      <Center
        p={RFValue(2)}
        backgroundColor={type === 'primary' ? '#3D56F0' : 'white'}
        borderRadius={99999}
        borderWidth={RFValue(2)}
        borderColor="#576AFF"
      >
        <Ionicons
          name="arrow-forward"
          size={RFValue(20)}
          color={type === 'primary' ? 'white' : '#3D56F0'}
        />
      </Center>
    </Pressable>
  );
};

export { RegisterButton };
