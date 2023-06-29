import { Avatar, Box, Button, Image, Skeleton, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useAuth } from '@hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { GetUserProfileByIdResponse as UserProfileDataType } from '@dtos/Users/GetUserProfileByIdResponseDTO';
import { getUserProfileByIdService } from '@services/Users/getUserProfileById';

import LogoImage from '@assets/images/logo.png';

const Profile: React.FC = () => {
  const { logout, userId } = useAuth();

  const [userProfileData, setUserProfileData] = useState<UserProfileDataType>(
    {} as UserProfileDataType
  );
  const [isLoading, setIsLoading] = useState(true);

  const getUserProfileData = useCallback(async () => {
    try {
      if (userId) {
        const response = await getUserProfileByIdService(userId);

        setUserProfileData(response);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      flex={1}
      style={{
        paddingTop: RFValue(getStatusBarHeight() + 50),
      }}
      alignItems="center"
    >
      {isLoading ? (
        <Skeleton
          w={RFValue(100)}
          h={RFValue(100)}
          endColor="warmGray.100"
          rounded="full"
          style={{
            marginBottom: RFValue(32),
          }}
        />
      ) : (
        <Avatar
          w={RFValue(100)}
          h={RFValue(100)}
          source={{
            uri: userProfileData.avatar,
          }}
          style={{
            marginBottom: RFValue(32),
          }}
        />
      )}

      {isLoading ? (
        <Skeleton
          w="80%"
          h={RFValue(20)}
          rounded="full"
          endColor="warmGray.100"
          style={{ marginBottom: RFValue(10) }}
        />
      ) : (
        <Text
          fontFamily="semibold"
          fontSize={RFValue(18)}
          lineHeight={RFValue(20)}
          style={{ marginBottom: RFValue(10), paddingHorizontal: RFValue(10) }}
          textAlign="center"
        >
          {userProfileData.name}
        </Text>
      )}

      {isLoading ? (
        <Skeleton
          w="60%"
          h={RFValue(14)}
          rounded="full"
          endColor="warmGray.100"
        />
      ) : (
        <Text
          fontFamily="regular"
          fontSize={RFValue(12)}
          lineHeight={RFValue(14)}
        >
          {userProfileData.email}
        </Text>
      )}

      <Box
        w="100%"
        mt="auto"
        justifyContent="flex-end"
        alignItems="center"
        bottom={0}
      >
        <Image
          source={LogoImage}
          alt="Logo MEINDICA"
          h={RFValue(100)}
          resizeMode="contain"
          style={{ marginBottom: RFValue(120) }}
        />
        <Button
          background="purple.500"
          onPress={logout}
          w="60%"
          style={{ marginBottom: RFValue(40) }}
        >
          <Text fontFamily="medium" fontSize={RFValue(16)} color="white">
            Sair
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export { Profile };
