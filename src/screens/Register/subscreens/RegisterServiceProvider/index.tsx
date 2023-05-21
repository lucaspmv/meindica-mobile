import { useNavigation } from '@react-navigation/native';
import { RegisterButton } from '@screens/Register/components/Button';
import { ButtonBack } from '@screens/Register/components/ButtonBack';
import { Box, Text, VStack } from 'native-base';

import * as yup from 'yup';

import { RFValue } from 'react-native-responsive-fontsize';
import { validateCNPJ } from '@utils/validateCNPJ';
import { InputText } from '@screens/Register/components/InputText';

import { InputSelect } from '@screens/Register/components/InputSelect';
import { states } from '@utils/states';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface FormData {
  cnpj: string;
  phone: string;
  about: string;
  state: string;
  city: string;
  birthday: Date;
}

const schema = {
  cnpj: yup
    .string()
    .required('O CNPJ é obrigatório.')
    .min(18, 'O CNPJ precisa ser um número válido.')
    .test({
      name: 'CNPJ validation',
      test: (value) => validateCNPJ(value ?? ''),
      message: 'O CNPJ informado é inválido.',
    }),
  phone: yup
    .string()
    .required('O número de telefone é obrigatório.')
    .min(14, 'O telefone precisar ser um número válido.'),
  about: yup.string(),
  state: yup.string().required('O estado é obrigatório.'),
  city: yup.string().required('A cidade é obrigatória.'),
  birthday: yup.date().required('A data de nascimento é obrigatória'),
};

const RegisterServiceProvider: React.FC = () => {
  const { goBack } = useNavigation();

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
          <InputText label="CNPJ" placeholder="00.000.000/0000-00" isRequired />
          <InputText
            label="Celular (WhatsApp)"
            placeholder="(00) 00000-0000"
            isRequired
          />
          <InputText
            label="Data de Nascimento"
            placeholder="00/00/0000"
            isRequired
          />
          <InputSelect label="Estado" items={states} isRequired />
          <InputText label="Cidade" isRequired />
          <InputText
            label="Sobre"
            multiline
            placeholder="Conte um pouco sobre você e seus serviços..."
          />
        </VStack>
        <RegisterButton label="AVANÇAR" onPress={() => {}} />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export { RegisterServiceProvider };
