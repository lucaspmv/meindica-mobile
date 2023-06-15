import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputTextControlled } from '@screens/Register/components/InputText/InputTextControlled';
import { RegisterButton } from '@screens/Register/components/Button';
import { ButtonBack } from '@screens/Register/components/ButtonBack';
import { InputSelectControlled } from '@screens/Register/components/InputSelect/InputSelectControlled';

import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@enums/UserTypeEnum';
import { categories } from '@utils/categories';
import { RegisterRoutesList } from '@routes/register.routes';
import { RouteNameEnum } from '@enums/RouteNameEnum';

interface FormData {
  category: string;
  activityName: string;
  description: string;
}

const schema = yup
  .object({
    category: yup.string().required('A Categoria é obrigatória.'),
    activityName: yup.string().required('O Nome do serviço é obrigatório.'),
    description: yup.string(),
  })
  .required();

const RegisterServiceProviderActivity: React.FC = () => {
  const { register } = useAuth();
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

  const handleSubmit = useCallback(() => {
    console.log({ ...getValues(), ...params });
    register(UserTypeEnum.SERVICE_PROVIDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, register]);

  useEffect(() => {
    if (params.activityName && !getValues('activityName')) {
      setValue('activityName', params.activityName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.activityName]);

  return (
    <Box flex={1}>
      <ButtonBack pl={RFValue(20)} onPress={goBack} mb={1} />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: RFValue(48),
          paddingTop: RFValue(11),
          paddingHorizontal: RFValue(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text fontFamily="regular" fontSize={RFValue(15)} mb={RFValue(20)}>
          Agora vamos cadastrar a sua atividade principal. Esses dados servirão
          para você poder divulgar o seu serviço.
        </Text>
        <VStack style={{ gap: RFValue(10) }} mb={RFValue(60)}>
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
            errors={errors}
          />
        </VStack>
        <RegisterButton
          label="AVANÇAR"
          onPress={handleSubmit}
          isDisabled={!isValid}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export { RegisterServiceProviderActivity };
