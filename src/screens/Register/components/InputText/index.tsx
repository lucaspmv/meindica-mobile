import { Divider, HStack, IInputProps, Input, Text, VStack } from 'native-base';

import { RFValue } from 'react-native-responsive-fontsize';

interface InputTextProps extends IInputProps {
  label: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
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
          borderColor: 'purple.500',
        }}
        {...rest}
      />
    </VStack>
  );
};

export { InputText };
