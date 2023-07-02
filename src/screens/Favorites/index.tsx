import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Box, FlatList, Image, Text, useTheme } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { GetServiceProviderResponseDTO as ServiceProvider } from '@dtos/ServiceProviders/GetServiceProviderResponseDTO';
import { ServiceProviderCard } from '@screens/Explore/components/ServiceProviderCard';
import { getServiceProvidersService } from '@services/ServiceProviders/getServiceProviders';

import NoDataImage from '@assets/images/no-data.png';

import { getItem } from '@services/AsyncStorage';
import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';
import { useFocusEffect } from '@react-navigation/native';

const Favorites: React.FC = () => {
  const { colors } = useTheme();

  const [likedServiceProviders, setLikedServiceProviders] = useState<
    ServiceProvider[]
  >([]);
  const [refreshLikedServiceProviders, setRefreshLikedServiceProviders] =
    useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const getLikedServiceProviders = useCallback(async () => {
    try {
      const response = await getServiceProvidersService();
      const cachedServiceProvidersIds = await getItem<string[]>(
        AsyncStorageKeyEnum.FAVORITES_IDS
      );

      if (response.length > 0 && cachedServiceProvidersIds) {
        const newLikedServiceProviders = response.filter((i) =>
          cachedServiceProvidersIds.includes(i.serviceProviderId)
        );
        setLikedServiceProviders(newLikedServiceProviders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getLikedServiceProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshLikedServiceProviders((prevState) => !prevState);
    }, [])
  );

  return (
    <Box
      style={{
        paddingTop: RFValue(getStatusBarHeight() + 14),
      }}
    >
      <Text
        fontFamily="medium"
        fontSize={RFValue(24)}
        style={{ marginLeft: RFValue(24) }}
      >
        Favoritos
      </Text>
      <FlatList
        data={likedServiceProviders}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getLikedServiceProviders}
            colors={[colors.purple[500]]}
          />
        }
        keyExtractor={(item) => item.serviceProviderId}
        contentContainerStyle={{
          paddingTop: RFValue(16),
          paddingHorizontal: RFValue(24),
          paddingBottom: RFValue(100),
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box h={RFValue(8)} />}
        ListEmptyComponent={() => (
          <Image
            w={RFValue(186)}
            h={RFValue(166)}
            source={NoDataImage}
            alt="Empty result"
            mx="auto"
            style={{
              marginTop: RFValue(100),
            }}
          />
        )}
        renderItem={({ item }) => (
          <ServiceProviderCard
            serviceProviderId={item.serviceProviderId}
            name={item.name}
            publicName={item.publicName}
            activityName={item.activityName}
            city={item.city}
            image={item.avatar}
            refresh={refreshLikedServiceProviders}
          />
        )}
      />
    </Box>
  );
};

export { Favorites };
