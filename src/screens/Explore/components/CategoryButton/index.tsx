import { Pressable, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  isActive,
  onPress,
}) => {
  return (
    <Pressable
      h={RFValue(40)}
      bg={isActive ? '#02E9FE' : 'white'}
      borderRadius={RFValue(20)}
      alignItems="center"
      justifyContent="center"
      px={RFValue(24)}
      shadow={2}
      onPress={onPress}
      _pressed={{
        opacity: 0.95,
      }}
    >
      <Text fontFamily="medium" color="purple.700" fontSize={RFValue(15)}>
        {title}
      </Text>
    </Pressable>
  );
};

export { CategoryButton };
