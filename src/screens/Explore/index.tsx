import { useCallback, useMemo, useRef, useState } from 'react';
import { Box, Text, Pressable, Divider, Image, FlatList } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import SearchImage from '@assets/images/search.png';

import { categories } from '@utils/categories';
import { CategoryButton } from './components/CategoryButton';
import { ServiceProviderCard } from './components/ServiceProviderCard';
import { serviceProviders } from '@utils/serviceProviders';
import { states } from '@utils/states';
import { statesAndCitiesDictionary } from '@utils/statesAndCitiesDictionary';

const Explore: React.FC = () => {
  const statePickerRef = useRef<any>(null);
  const cityPickerRef = useRef<any>(null);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedState, setSelectedState] = useState('DF');
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    'Brasília'
  );

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
      if (selectedCity) {
        isValid = isValid && i.city === selectedCity;
      }

      return isValid && i.state === selectedState;
    });
  }, [searchText, selectedCategory, selectedCity, selectedState]);

  const onStateChange = useCallback((itemValue: string) => {
    setSelectedState(itemValue);
    setSelectedCity(undefined);

    setTimeout(() => {
      cityPickerRef.current?.focus();
    }, 500);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Picker
        ref={statePickerRef}
        onValueChange={onStateChange}
        style={{ display: 'none' }}
        mode="dropdown"
      >
        {states.map((state) => (
          <Picker.Item
            key={state.value}
            label={state.label}
            value={state.value}
          />
        ))}
      </Picker>
      <Picker
        ref={cityPickerRef}
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
        style={{ display: 'none' }}
        mode="dropdown"
      >
        {statesAndCitiesDictionary[selectedState].map((state) => (
          <Picker.Item
            key={state.value}
            label={state.label}
            value={state.value}
          />
        ))}
      </Picker>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1}>
          <Box>
            <Box
              height={RFValue(185)}
              borderBottomRadius={RFValue(33)}
              bgColor="purple.700"
              style={{
                paddingTop: RFValue(getStatusBarHeight() + 14),
              }}
            >
              <Pressable
                onPress={statePickerRef.current?.focus}
                alignItems="center"
                mx="auto"
              >
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
                    Localização
                  </Text>
                  <FontAwesome
                    name="caret-down"
                    size={RFValue(18)}
                    color="white"
                  />
                </Box>
                <Text fontFamily="medium" fontSize={RFValue(13)} color="white">
                  {selectedCity}, {selectedState}
                </Text>
              </Pressable>
              <Box
                flexDir="row"
                alignItems="center"
                style={{
                  marginTop: RFValue(26),
                  paddingHorizontal: RFValue(27),
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
