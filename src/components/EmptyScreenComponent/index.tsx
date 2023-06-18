import { Box, Image, Text } from 'native-base';

import EmptyImage from '@assets/images/empty.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface EmptyScreenComponentProps {
  title: string;
}

const EmptyScreenComponent: React.FC<EmptyScreenComponentProps> = ({
  title,
}) => {
  return (
    <Box
      flex={1}
      pt={RFValue(15)}
      px={RFValue(20)}
      style={{
        marginTop: RFValue(getStatusBarHeight()),
      }}
    >
      <Text
        fontFamily="medium"
        fontSize={RFValue(24)}
        style={{
          marginBottom: RFValue(100),
        }}
      >
        {title}
      </Text>
      <Image source={EmptyImage} alt="unDraw" mx="auto" />
    </Box>
  );
};

export { EmptyScreenComponent };
