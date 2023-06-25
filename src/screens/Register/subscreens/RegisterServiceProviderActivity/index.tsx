import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Text, VStack, Pressable, FlatList, Image } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '@hooks/useAuth';

import { InputTextControlled } from '@screens/Register/components/InputText/InputTextControlled';
import { RegisterButton } from '@screens/Register/components/Button';
import { ButtonBack } from '@screens/Register/components/ButtonBack';
import { InputSelectControlled } from '@screens/Register/components/InputSelect/InputSelectControlled';

import { categories } from '@utils/categories';
import { RegisterRoutesList } from '@routes/register.routes';
import { RouteNameEnum } from '@enums/RouteNameEnum';
import { generateRandomId } from '@utils/generateRandomId';

interface ImageType {
  id: string;
  base64: string;
}

interface FormData {
  category: string;
  activityName: string;
  description: string | undefined;
}

const schema = yup
  .object({
    category: yup.string().required('A Categoria é obrigatória.'),
    activityName: yup.string().required('O Nome do serviço é obrigatório.'),
    description: yup.string(),
  })
  .required();

const RegisterServiceProviderActivity: React.FC = () => {
  const { registerServiceProvider } = useAuth();
  const { goBack } = useNavigation();
  const { params } =
    useRoute<
      RouteProp<
        RegisterRoutesList,
        RouteNameEnum.REGISTER_SERVICE_PROVIDER_ACTIVITY
      >
    >();
  const {
    control,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addImageFromLibrary = useCallback(async () => {
    if (images.length === 5) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevState) => [
        ...prevState,
        {
          id: generateRandomId(),
          base64: 'data:image/jpeg;base64,' + result.assets[0].base64,
        },
      ]);
    }
  }, [images.length]);

  const removeImage = useCallback(
    (id: string) => {
      const imagesDeepCopy: ImageType[] = JSON.parse(JSON.stringify(images));

      const newImages = imagesDeepCopy.filter((image) => image.id !== id);

      setImages(newImages);
    },
    [images]
  );

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      await registerServiceProvider({
        ...params,
        ...getValues(),
        activityName: getValues('activityName').trim(),
        images: images.map((image) => image.base64),
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, params, registerServiceProvider]);

  useEffect(() => {
    if (params.activityName && !getValues('activityName')) {
      setValue('activityName', params.activityName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flex={1}>
      <ButtonBack
        onPress={goBack}
        disabled={isLoading}
        style={{ marginBottom: RFValue(4), paddingLeft: RFValue(16) }}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: RFValue(48),
          paddingTop: RFValue(11),
          paddingHorizontal: RFValue(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          fontFamily="regular"
          fontSize={RFValue(15)}
          style={{ marginBottom: RFValue(20) }}
        >
          Agora vamos cadastrar a sua atividade principal. Esses dados servirão
          para você poder divulgar o seu serviço.
        </Text>
        <VStack style={{ gap: RFValue(10), marginBottom: RFValue(60) }}>
          <InputSelectControlled
            control={control}
            name="category"
            label="Categoria"
            placeholder="Ex: Reformas e Reparos"
            items={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            isRequired
          />
          <InputTextControlled
            control={control}
            name="activityName"
            label="Nome do serviço"
            multiline
            placeholder="Ex: Pedreiro, Eletricista, Encanador"
            errors={errors}
            isRequired
          />
          <InputTextControlled
            control={control}
            name="description"
            label="Breve descrição do seu serviço"
            multiline
            height={RFValue(115)}
            textAlignVertical="top"
            errors={errors}
          />
          <Box>
            <Text
              fontSize={RFValue(13)}
              fontFamily="semibold"
              style={{ marginBottom: RFValue(6) }}
            >
              Adicionar fotos
            </Text>
            <Pressable
              h={RFValue(56)}
              flexDir="row"
              alignItems="center"
              borderWidth={RFValue(1)}
              borderRadius={RFValue(12)}
              borderColor="#E4DFDF"
              onPress={addImageFromLibrary}
              style={{
                marginBottom: RFValue(12),
                paddingRight: RFValue(18),
                paddingLeft: RFValue(14),
              }}
            >
              <Box
                w={RFValue(32)}
                h={RFValue(32)}
                alignItems="center"
                justifyContent="center"
                borderRadius={RFValue(4)}
                bgColor="#EDF2FF"
              >
                <Feather name="upload" size={RFValue(18)} color="#265EFD" />
              </Box>
              <Box
                height={RFValue(32)}
                justifyContent="center"
                style={{ gap: RFValue(3), marginLeft: RFValue(8) }}
              >
                <Text
                  fontFamily="medium"
                  fontSize={RFValue(14)}
                  lineHeight={RFValue(14)}
                >
                  Adicionar imagem
                </Text>
                <Text
                  fontFamily="regular"
                  fontSize={RFValue(12)}
                  lineHeight={RFValue(12)}
                  color="#6C7077"
                >
                  Galeria
                </Text>
              </Box>
            </Pressable>
            {images.length > 0 && (
              <FlatList
                data={images}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => removeImage(item.id)}
                    _pressed={{
                      opacity: 0.8,
                    }}
                  >
                    <Image
                      w={RFValue(65)}
                      h={RFValue(65)}
                      borderRadius={RFValue(8)}
                      source={{ uri: item.base64 }}
                      alt="Activity Image"
                    />
                  </Pressable>
                )}
                ItemSeparatorComponent={() => <Box w={RFValue(RFValue(12))} />}
                horizontal
              />
            )}
          </Box>
        </VStack>
        <RegisterButton
          label="AVANÇAR"
          onPress={() => handleSubmit()}
          isDisabled={!isValid || isLoading}
          isLoading={isLoading}
          mt="auto"
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export { RegisterServiceProviderActivity };
