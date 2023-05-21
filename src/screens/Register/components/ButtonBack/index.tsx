import { IPressableProps, Pressable } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const ButtonBack: React.FC<IPressableProps> = ({ ...rest }) => {
  return (
    <Pressable
      ml={-1}
      mr="auto"
      hitSlop={{
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
      }}
      {...rest}
    >
      <Ionicons name="arrow-back" size={RFValue(22.5)} color="black" />
    </Pressable>
  );
};

export { ButtonBack };
