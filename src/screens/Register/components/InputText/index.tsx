import { Divider, HStack, IInputProps, Input, Text, VStack } from 'native-base';

import { RFValue } from 'react-native-responsive-fontsize';

export interface InputTextProps extends IInputProps {
  label: string;
  error?: string;
}

const InputText: React.FC<InputTextProps> = ({
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
            ml={RFValue(1)}
            fontSize={RFValue(14)}
            lineHeight={RFValue(13)}
            color="danger.500"
          >
            *
          </Text>
        )}
      </HStack>
      <Divider height={RFValue(6)} bgColor="transparent" />
      <Input
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
