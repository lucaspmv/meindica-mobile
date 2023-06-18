import { useMemo, useState } from 'react';
import { Box, Text, Pressable, Divider, Image, FlatList } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import SearchImage from '@assets/images/search.png';

import { categories } from '@utils/categories';
import { CategoryButton } from './components/CategoryButton';
import { ServiceProviderCard } from './components/ServiceProviderCard';
import { serviceProviders } from '@utils/serviceProviders';

const Explore: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const filteredServiceProviders = useMemo(() => {
    return serviceProviders.filter((i) => {
      let isValid = true;

      if (searchText) {
        isValid = i.activityName
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      }
      if (selectedCategory) {
        isValid = isValid && i.category === selectedCategory;
      }

      return isValid;
    });
  }, [searchText, selectedCategory]);

  return (
    <>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1}>
          <Box>
            <Box
              height={RFValue(185)}
              pt={RFValue(getStatusBarHeight() + 14)}
              borderBottomRadius={RFValue(33)}
              bgColor="purple.700"
            >
              <Box alignItems="center">
                <Box
                  flexDir="row"
                  alignItems="center"
                  style={{
                    marginBottom: RFValue(4),
                  }}
                >
                  <Text
                    fontFamily="regular"
                    fontSize={RFValue(11)}
                    opacity={0.7}
                    color="white"
                    style={{
                      marginRight: RFValue(4),
                    }}
                  >
                    Localização atual
                  </Text>
                  <FontAwesome
                    name="caret-down"
                    size={RFValue(18)}
                    color="white"
                  />
                </Box>
                <Text fontFamily="medium" fontSize={RFValue(13)} color="white">
                  Brasília, DF
                </Text>
              </Box>
              <Box
                flexDir="row"
                alignItems="center"
                px={RFValue(27)}
                style={{
                  marginTop: RFValue(26),
                }}
              >
                <Pressable
                  style={{
                    marginRight: RFValue(10),
                  }}
                >
                  <Image source={SearchImage} alt="Procurar" />
                </Pressable>
                <Divider h={RFValue(20)} w={RFValue(1)} bgColor="#7974E7" />
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  style={{
                    flex: 1,
                    paddingLeft: RFValue(7),
                    fontSize: RFValue(20),
                    fontFamily: 'Montserrat_400Regular',
                    color: 'white',
                  }}
                  placeholder="Pesquisar..."
                  placeholderTextColor="#7974E7"
                  selectionColor="transparent"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  selectTextOnFocus
                />
              </Box>
            </Box>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              style={{
                marginTop: -RFValue(22.5),
              }}
              contentContainerStyle={{
                paddingBottom: RFValue(4),
              }}
              ListHeaderComponent={<Box w={RFValue(35)} />}
              ListFooterComponent={<Box w={RFValue(35)} />}
              ItemSeparatorComponent={() => <Box w={RFValue(9)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <CategoryButton
                  title={item}
                  isActive={selectedCategory === item}
                  onPress={
                    selectedCategory === item
                      ? () => setSelectedCategory(undefined)
                      : () => setSelectedCategory(item)
                  }
                />
              )}
            />
          </Box>
          <FlatList
            data={filteredServiceProviders}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{
              paddingTop: RFValue(16),
              paddingHorizontal: RFValue(24),
              paddingBottom: RFValue(100),
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Box h={RFValue(8)} />}
            renderItem={({ item }) => (
              <ServiceProviderCard
                name={item.name}
                activityName={item.activityName}
                city={item.city}
                image={item.image}
              />
            )}
          />
        </Box>
      </TouchableWithoutFeedback>
    </>
  );
};

export { Explore };
