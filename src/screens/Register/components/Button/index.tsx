import {
  Center,
  IPressableProps,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

interface RegisterButtonProps extends IPressableProps {
  label: string;
  type?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  label,
  type = 'primary',
  isLoading = false,
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
        opacity: !isLoading ? 0.6 : 1,
      }}
      style={{
        paddingLeft: !isLoading ? RFValue(25) : 0,
        paddingRight: !isLoading ? RFValue(12) : 0,
      }}
      {...rest}
    >
      {isLoading ? (
        <Spinner size="lg" color="#FFFFFF" mx="auto" />
      ) : (
        <>
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
        </>
      )}
    </Pressable>
  );
};

export { RegisterButton };
