import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { useAuth } from '@hooks/useAuth';

import DealImage from '@assets/images/deal.png';
import WhatsAppImage from '@assets/images/whatsapp.png';

import { UserTypeEnum } from '@enums/UserTypeEnum';
import { RouteNameEnum } from '@enums/RouteNameEnum';

import { AppRoutesList } from '@routes/app.routes';
import { useCallback, useEffect, useState } from 'react';
import { GetServiceProviderActivityResponseDTO as ServiceProviderActivityDetailsType } from '@dtos/ServiceProviders/GetServiceProviderActivityResponseDTO';
import { getServiceProviderActivityDetailsService } from '@services/ServiceProviders/getServiceProviderActivityDetails';
import { ActivityImage } from './components/ActivityImage';

const ServiceProviderActivityDetails: React.FC = () => {
  const { userType } = useAuth();
  const { goBack } = useNavigation();
  const { params } =
    useRoute<
      RouteProp<AppRoutesList, RouteNameEnum.SERVICE_PROVIDER_ACTIVITY_DETAILS>
    >();

  const [isLoading, setIsLoading] = useState(true);
  const [serviceProviderActivityDetails, setServiceProviderActivityDetails] =
    useState<ServiceProviderActivityDetailsType>(
      {} as ServiceProviderActivityDetailsType
    );

  const getServiceProviderActivityDetails = useCallback(async () => {
    try {
      const response = await getServiceProviderActivityDetailsService(
        params.serviceProviderId
      );

      setServiceProviderActivityDetails(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [params.serviceProviderId]);

  const handleGetInTouch = useCallback(() => {
    const parsedPhone = serviceProviderActivityDetails.phone.replace(/\D/g, '');

    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${parsedPhone}&text=Olá ${
        serviceProviderActivityDetails.publicName ??
        serviceProviderActivityDetails.name
      }, como vai? Encontrei seu perfil através do aplicativo MEINDICA e gostaria de saber mais sobre o seu serviço.`
    );
  }, [
    serviceProviderActivityDetails.name,
    serviceProviderActivityDetails.phone,
    serviceProviderActivityDetails.publicName,
  ]);

  useEffect(() => {
    getServiceProviderActivityDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Box
        flex={1}
        style={{
          marginTop: RFValue(getStatusBarHeight()),
        }}
      >
        {isLoading ? (
          <Spinner size="lg" my="auto" />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: RFValue(150),
              }}
            >
              <Image
                source={DealImage}
                alt="Deal Image"
                w="auto"
                h={RFValue(185)}
              />
              <Box
                style={{
                  paddingHorizontal: RFValue(14),
                }}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  style={{
                    marginTop: RFValue(11),
                    marginBottom: RFValue(6),
                    marginHorizontal: -RFValue(3.5),
                  }}
                >
                  <Pressable onPress={goBack}>
                    <Feather
                      name="arrow-left"
                      size={RFValue(22.5)}
                      color="#5D5FEF"
                    />
                  </Pressable>
                  <HStack>
                    {userType === UserTypeEnum.CUSTOMER && (
                      <Pressable
                        style={{
                          marginRight: RFValue(16),
                        }}
                      >
                        <Feather
                          name="heart"
                          size={RFValue(20)}
                          color="#5D5FEF"
                        />
                      </Pressable>
                    )}
                    <Pressable opacity={0.6} disabled>
                      <Feather
                        name="share-2"
                        size={RFValue(20)}
                        color="#5D5FEF"
                      />
                    </Pressable>
                  </HStack>
                </HStack>
                <Text
                  fontFamily="semibold"
                  fontSize={RFValue(24)}
                  lineHeight={RFValue(28)}
                >
                  {serviceProviderActivityDetails.publicName ??
                    serviceProviderActivityDetails.name}
                </Text>
                <Text
                  fontFamily="semibold"
                  fontSize={RFValue(12)}
                  color="purple.500"
                  style={{
                    marginBottom: RFValue(12),
                  }}
                >
                  {serviceProviderActivityDetails.activityName &&
                    serviceProviderActivityDetails.activityName.toLocaleUpperCase()}
                </Text>
                <Text
                  fontFamily="bold"
                  fontSize={RFValue(16)}
                  color="#262627"
                  style={{
                    marginBottom: RFValue(2.5),
                  }}
                >
                  Sobre
                </Text>
                <Text
                  fontFamily="regular"
                  fontSize={RFValue(12)}
                  color="#262627"
                  textAlign="justify"
                  style={{
                    marginBottom: RFValue(10),
                  }}
                >
                  {serviceProviderActivityDetails.about ?? 'N/A'}
                </Text>
                <Text
                  fontFamily="bold"
                  fontSize={RFValue(16)}
                  color="#262627"
                  style={{
                    marginBottom: RFValue(2.5),
                  }}
                >
                  Descrição do Serviço
                </Text>
                <Text
                  fontFamily="regular"
                  fontSize={RFValue(12)}
                  color="#262627"
                  textAlign="justify"
                  style={{
                    marginBottom: RFValue(10),
                  }}
                >
                  {serviceProviderActivityDetails.description ?? 'N/A'}
                </Text>
                {serviceProviderActivityDetails.images.length > 0 && (
                  <>
                    <Text
                      fontFamily="bold"
                      fontSize={RFValue(16)}
                      color="#262627"
                      style={{
                        marginBottom: RFValue(4),
                      }}
                    >
                      Fotos
                    </Text>
                    <FlatList
                      data={serviceProviderActivityDetails.images}
                      keyExtractor={(item) => item.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <Box w={RFValue(6)} />}
                      renderItem={({ item }) => (
                        <ActivityImage base64={item.base64} />
                      )}
                    />
                  </>
                )}
                <HStack
                  style={{
                    marginTop: RFValue(20),
                  }}
                >
                  <Feather name="map-pin" size={RFValue(18)} color="#262627" />
                  <Box
                    style={{
                      marginLeft: RFValue(6),
                    }}
                  >
                    <Text
                      fontFamily="bold"
                      fontSize={RFValue(16)}
                      lineHeight={RFValue(16)}
                      color="#262627"
                      style={{
                        marginTop: RFValue(2.5),
                      }}
                    >
                      {serviceProviderActivityDetails.city}
                    </Text>
                    <Text fontFamily="regular">
                      {serviceProviderActivityDetails.state}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </ScrollView>
            <Pressable
              shadow={3}
              position="absolute"
              h={RFValue(58)}
              bgColor="purple.500"
              w="80%"
              borderRadius={RFValue(15)}
              alignItems="center"
              justifyContent="center"
              alignSelf="center"
              style={{
                bottom: RFValue(14),
              }}
              _pressed={{
                opacity: 0.9,
              }}
              onPress={handleGetInTouch}
            >
              <HStack alignItems="center">
                <Image
                  source={WhatsAppImage}
                  alt="Whatsapp Image"
                  resizeMode="center"
                  w={RFValue(20)}
                  style={{
                    marginRight: RFValue(8),
                  }}
                />
                <Text fontFamily="medium" fontSize={RFValue(15)} color="white">
                  ENTRAR EM CONTATO
                </Text>
              </HStack>
            </Pressable>
          </>
        )}
      </Box>
    </>
  );
};

export { ServiceProviderActivityDetails };
