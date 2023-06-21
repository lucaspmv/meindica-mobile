import { Avatar, Box, Button, HStack, Pressable, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '@hooks/useAuth';

const Profile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Box
      flex={1}
      style={{
        paddingTop: RFValue(getStatusBarHeight() + 40),
      }}
      alignItems="center"
    >
      <Avatar
        w={RFValue(100)}
        h={RFValue(100)}
        source={{
          uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
        style={{
          marginBottom: RFValue(32),
        }}
      />
      <HStack
        alignItems="center"
        style={{
          marginBottom: RFValue(6),
        }}
      >
        <Text
          fontFamily="semibold"
          fontSize={RFValue(18)}
          style={{
            marginRight: RFValue(8),
          }}
        >
          Lucas Porto Mendes
        </Text>
        <Pressable>
          <Feather name="edit-3" size={RFValue(20)} color="#333538" />
        </Pressable>
      </HStack>
      <Text
        fontFamily="regular"
        fontSize={RFValue(12)}
        style={{
          marginBottom: RFValue(40),
        }}
      >
        lucas.porto@sempreceub.com
      </Text>

      <Button background="purple.500" onPress={logout} w="60%" mx="auto">
        Sair
      </Button>
    </Box>
  );
};

export { Profile };
