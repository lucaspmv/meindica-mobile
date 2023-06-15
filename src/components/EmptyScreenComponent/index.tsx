import { Box, Image, Text } from 'native-base';

import EmptyImage from '@assets/images/empty.png';
import { RFValue } from 'react-native-responsive-fontsize';

interface EmptyScreenComponentProps {
  title: string;
}

const EmptyScreenComponent: React.FC<EmptyScreenComponentProps> = ({
  title,
}) => {
  return (
    <Box flex={1} pt={RFValue(15)} px={RFValue(20)}>
      <Text fontFamily="medium" fontSize={RFValue(24)} mb={RFValue(100)}>
        {title}
      </Text>
      <Image source={EmptyImage} alt="unDraw" mx="auto" />
    </Box>
  );
};

export { EmptyScreenComponent };
