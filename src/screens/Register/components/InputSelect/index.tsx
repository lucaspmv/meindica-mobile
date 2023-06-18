import {
  Divider,
  HStack,
  ISelectProps,
  Select,
  Text,
  VStack,
} from 'native-base';

import { RFValue } from 'react-native-responsive-fontsize';

export interface InputSelectProps extends ISelectProps {
  label: string;
  isRequired: boolean;
  items: {
    label: string;
    value: string;
  }[];
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  isRequired,
  items,
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
      <Select
        h={RFValue(46)}
        fontSize={RFValue(14)}
        borderRadius={RFValue(12)}
        {...rest}
      >
        {items.map(({ label, value }) => (
          <Select.Item key={value} label={label} value={value} />
        ))}
      </Select>
    </VStack>
  );
};

export { InputSelect };
