import { TextInput } from 'react-native';
import { Divider, HStack, IInputProps, Input, Text, VStack } from 'native-base';

import { RFValue } from 'react-native-responsive-fontsize';

export interface InputTextProps extends IInputProps {
  label: string;
  error?: string;
  inputTextRef?: React.Ref<TextInput>;
}

const InputText: React.FC<InputTextProps> = ({
  inputTextRef,
  label,
  error,
  isRequired,
  multiline,
  ...rest
}) => {
  return (
    <VStack>
      <HStack>
        <Text fontSize={RFValue(13)} fontFamily="semibold">
          {label}
        </Text>
        {isRequired && (
          <Text
            fontSize={RFValue(14)}
            lineHeight={RFValue(13)}
            color="danger.500"
            style={{
              marginLeft: RFValue(4),
            }}
          >
            *
          </Text>
        )}
      </HStack>
      <Divider height={RFValue(6)} bgColor="transparent" />
      <Input
        ref={inputTextRef ? inputTextRef : undefined}
        h={!multiline ? RFValue(46) : undefined}
        minH={multiline ? RFValue(46) : undefined}
        multiline={multiline}
        maxLength={300}
        fontSize={RFValue(14)}
        borderRadius={RFValue(12)}
        _focus={{
          bgColor: 'purple.50',
          borderColor: error ? 'danger.500' : 'purple.500',
        }}
        {...rest}
      />
      {error && (
        <>
          <Divider height={RFValue(3)} bgColor="transparent" />
          <Text fontFamily="medium" fontSize={RFValue(12)} color="danger.500">
            {error}
          </Text>
        </>
      )}
    </VStack>
  );
};

export { InputText };
