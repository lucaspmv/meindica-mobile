import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';

import DealImage from '@assets/images/deal.png';
import WhatsAppImage from '@assets/images/whatsapp.png';

import { UserTypeEnum } from '@enums/UserTypeEnum';

const ServiceProviderActivityDetails: React.FC = () => {
  const { userType } = useAuth();
  const { goBack } = useNavigation();

  return (
    <>
      <StatusBar style="dark" />
      <Box
        flex={1}
        style={{
          marginTop: RFValue(getStatusBarHeight()),
        }}
      >
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
            h={RFValue(200)}
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
                    <Feather name="heart" size={RFValue(20)} color="#5D5FEF" />
                  </Pressable>
                )}
                <Pressable opacity={0.6} disabled>
                  <Feather name="share-2" size={RFValue(20)} color="#5D5FEF" />
                </Pressable>
              </HStack>
            </HStack>
            <Text fontFamily="semibold" fontSize={RFValue(24)}>
              João da Silva
            </Text>
            <Text
              fontFamily="semibold"
              fontSize={RFValue(12)}
              color="purple.500"
              style={{
                marginBottom: RFValue(12),
              }}
            >
              PEDREIRO
            </Text>
            <Text
              fontFamily="bold"
              fontSize={RFValue(16)}
              color="#262627"
              style={{
                marginBottom: RFValue(2.5),
              }}
            >
              Descrição
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
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
              data={[{}, {}, {}, {}]}
              // keyExtractor={}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box w={RFValue(6)} />}
              renderItem={({ item }) => (
                <Image
                  alt="Service Image"
                  source={DealImage}
                  w={RFValue(93)}
                  h={RFValue(65)}
                  borderRadius={RFValue(3)}
                />
              )}
            />
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
                  Brasília
                </Text>
                <Text fontFamily="regular">DF</Text>
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
      </Box>
    </>
  );
};

export { ServiceProviderActivityDetails };
