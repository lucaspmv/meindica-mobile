import { TextInput } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { validateCNPJ } from '@utils/validateCNPJ';
import { states } from '@utils/states';

import { InputTextControlled } from '@screens/Register/components/InputText/InputTextControlled';
import { RegisterButton } from '@screens/Register/components/Button';
import { ButtonBack } from '@screens/Register/components/ButtonBack';
import { InputSelectControlled } from '@screens/Register/components/InputSelect/InputSelectControlled';

import { statesAndCitiesDictionary } from '@utils/statesAndCitiesDictionary';
import { getDataByCNPJ } from '@services/ReceitaWS/getDataByCNPJ';

import { RegisterNavigatorRoutesProps } from '@routes/register.routes';
import { RouteNameEnum } from '@enums/RouteNameEnum';

interface FormData {
  cnpj: string;
  phone: string;
  birthday: string;
  state: string;
  city: string;
  about: string;
  activityName?: string;
}

const schema = yup
  .object({
    cnpj: yup
      .string()
      .required('O CNPJ é obrigatório.')
      .min(18, 'O CNPJ precisa ser um número válido.')
      .test({
        name: 'CNPJ validation',
        test: (value) => validateCNPJ(value),
        message: 'O CNPJ informado é inválido.',
      }),
    phone: yup
      .string()
      .required('O número de telefone é obrigatório.')
      .min(15, 'O telefone precisar ser um número válido.'),
    birthday: yup
      .string()
      .required('A data de nascimento é obrigatória')
      .min(10, 'A data de nascimento precisa ser válida.'),
    state: yup.string().required('O estado é obrigatório.'),
    city: yup.string().required('A cidade é obrigatória.'),
    about: yup.string(),
    activityName: yup.string(),
  })
  .required();

const RegisterServiceProvider: React.FC = () => {
  const { navigate, goBack } = useNavigation<RegisterNavigatorRoutesProps>();
  const {
    control,
    watch,
    getValues,
    setValue,
    resetField,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const cnpjInputRef = useRef<TextInput>(null);

  const watchState = watch('state');
  const watchCnpj = watch('cnpj');

  const getServiceProviderDataByCNPJ = useCallback(
    async (cnpj: string) => {
      cnpjInputRef.current?.blur();
      try {
        const response = await getDataByCNPJ(cnpj);

        const parsedPhone =
          response.telefone.length < 15
            ? `${response.telefone.split(' ')[0]} 9${
                response.telefone.split(' ')[1]
              }`
            : response.telefone;

        setValue('phone', parsedPhone);
        setValue('state', response.uf);
        setValue('activityName', response.atividade_principal[0].text);
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleNext = useCallback(() => {
    console.log(getValues());
    navigate(RouteNameEnum.REGISTER_SERVICE_PROVIDER_ACTIVITY, {
      ...getValues(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (watchState) {
      if (getValues('city')) {
        resetField('city');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchState]);

  useEffect(() => {
    if (watchCnpj && watchCnpj.length === 18 && !getValues('phone')) {
      getServiceProviderDataByCNPJ(watchCnpj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCnpj]);

  return (
    <Box flex={1}>
      <ButtonBack
        pl={RFValue(20)}
        onPress={goBack}
        style={{
          marginBottom: RFValue(4),
        }}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: RFValue(48),
          paddingTop: RFValue(11),
          paddingHorizontal: RFValue(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          fontFamily="regular"
          fontSize={RFValue(15)}
          style={{
            marginBottom: RFValue(20),
          }}
        >
          Para completar o seu cadastro vamos precisar de mais alguns dados.
        </Text>
        <VStack style={{ gap: RFValue(10), marginBottom: RFValue(60) }}>
          <InputTextControlled
            control={control}
            inputTextRef={cnpjInputRef}
            name="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            mask="00.000.000/0000-00"
            isRequired
            keyboardType="numeric"
            errors={errors}
          />
          <InputTextControlled
            control={control}
            name="phone"
            label="Celular (WhatsApp)"
            placeholder="(00) 00000-0000"
            mask="(00) 00000-0000"
            isRequired
            keyboardType="numeric"
            errors={errors}
          />
          <InputTextControlled
            control={control}
            name="birthday"
            label="Data de Nascimento"
            placeholder="00/00/0000"
            mask="00/00/0000"
            isRequired
            keyboardType="numeric"
            errors={errors}
          />
          <InputSelectControlled
            control={control}
            name="state"
            label="Estado de Atuação"
            items={states}
            isRequired
          />
          <InputSelectControlled
            control={control}
            name="city"
            label="Cidade de Atuação"
            isDisabled={!watchState}
            items={watchState ? statesAndCitiesDictionary[watchState] : []}
            isRequired
          />
          <InputTextControlled
            control={control}
            name="about"
            label="Sobre"
            multiline
            placeholder="Conte um pouco sobre você e seu serviço..."
            errors={errors}
          />
        </VStack>
        <RegisterButton
          label="AVANÇAR"
          onPress={handleNext}
          isDisabled={!isValid}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export { RegisterServiceProvider };
