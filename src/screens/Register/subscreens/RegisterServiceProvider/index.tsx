import { useCallback } from 'react';
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

interface FormData {
  cnpj: string;
  phone: string;
  birthday: Date;
  state: string;
  city: string;
  about: string;
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
  })
  .required();

const RegisterServiceProvider: React.FC = () => {
  const { goBack } = useNavigation();
  const {
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleNext = useCallback(() => {
    console.log(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Para completar o seu cadastro vamos precisar de mais alguns dados.
        </Text>
        <VStack style={{ gap: RFValue(10) }} mb={RFValue(60)}>
          <InputTextControlled
            control={control}
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
            label="Estado"
            items={states}
            isRequired
          />
          <InputTextControlled
            control={control}
            name="city"
            label="Cidade"
            isRequired
            errors={errors}
          />
          <InputTextControlled
            control={control}
            name="about"
            label="Sobre"
            multiline
            placeholder="Conte um pouco sobre você e seus serviços..."
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
