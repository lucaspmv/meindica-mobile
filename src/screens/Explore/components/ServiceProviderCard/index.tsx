import { Box, Image, Pressable, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '@hooks/useAuth';

import MapPinImage from '@assets/images/map-pin.png';

import { UserTypeEnum } from '@enums/UserTypeEnum';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { RouteNameEnum } from '@enums/RouteNameEnum';
import { useCallback, useEffect, useState } from 'react';
import { getItem, setItem } from '@services/AsyncStorage';
import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';

interface ServiceProviderCardProps {
  serviceProviderId: string;
  image: string;
  name: string;
  publicName?: string;
  activityName: string;
  city: string;
  refresh: boolean;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  serviceProviderId,
  image,
  name,
  publicName,
  activityName,
  city,
  refresh,
}) => {
  const { userType } = useAuth();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [isLiked, setIsLiked] = useState<boolean>();

  const onLike = useCallback(async () => {
    const favoritesIds = await getItem<string[]>(
      AsyncStorageKeyEnum.FAVORITES_IDS
    );

    if (favoritesIds && favoritesIds.length > 0) {
      await setItem(AsyncStorageKeyEnum.FAVORITES_IDS, [
        ...favoritesIds,
        serviceProviderId,
      ]);
      setIsLiked(true);
      return;
    }

    await setItem(AsyncStorageKeyEnum.FAVORITES_IDS, [serviceProviderId]);
    setIsLiked(true);
  }, [serviceProviderId]);

  const onDislike = useCallback(async () => {
    const favoritesIds = await getItem<string[]>(
      AsyncStorageKeyEnum.FAVORITES_IDS
    );

    if (favoritesIds) {
      await setItem(
        AsyncStorageKeyEnum.FAVORITES_IDS,
        favoritesIds.filter((id) => id !== serviceProviderId)
      );
    }

    setIsLiked(false);
  }, [serviceProviderId]);

  const handleLikeAndDislike = useCallback(() => {
    if (isLiked) {
      onDislike();
    } else {
      onLike();
    }
  }, [isLiked, onDislike, onLike]);

  useEffect(() => {
    getItem(AsyncStorageKeyEnum.FAVORITES_IDS).then((value) => {
      if (value && value.includes(serviceProviderId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <Pressable
      onPress={() =>
        navigate(RouteNameEnum.SERVICE_PROVIDER_ACTIVITY_DETAILS, {
          serviceProviderId,
        })
      }
      flexDirection="row"
      bgColor="white"
      shadow={1}
      borderRadius={RFValue(18)}
      _pressed={{
        opacity: 0.9,
      }}
      style={{
        padding: RFValue(10),
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        alt="Foto do Prestador de Serviço"
        w={RFValue(RFValue(79))}
        h={RFValue(92)}
        borderRadius={RFValue(10)}
        style={{
          marginRight: RFValue(18),
        }}
      />
      <Box justifyContent="space-between" flex={1}>
        <Box
          style={{
            marginBottom: RFValue(8),
          }}
        >
          <Text
            fontFamily="semibold"
            color="purple.500"
            fontSize={RFValue(12)}
            numberOfLines={1}
            maxW="95%"
          >
            {activityName.toLocaleUpperCase()}
          </Text>
          <Text
            fontFamily="medium"
            fontSize={RFValue(15)}
            color="#120D26"
            numberOfLines={2}
          >
            {publicName ?? name}
          </Text>
        </Box>
        <Box flexDir="row" alignItems="center">
          <Image
            source={MapPinImage}
            alt="Marcador de Mapa"
            style={{
              marginRight: RFValue(8),
            }}
          />
          <Text fontFamily="regular" fontSize={RFValue(12)} color="#747688">
            {city}
          </Text>
        </Box>
      </Box>
      {userType === UserTypeEnum.CUSTOMER && (
        <Pressable
          onPress={() => handleLikeAndDislike()}
          maxH={RFValue(18)}
          _pressed={{
            opacity: 0.8,
          }}
        >
          <FontAwesome
            name={isLiked ? 'heart' : 'heart-o'}
            size={RFValue(18)}
            color={isLiked ? '#5D5FEF' : '#313338'}
          />
        </Pressable>
      )}
    </Pressable>
  );
};

export { ServiceProviderCard };
