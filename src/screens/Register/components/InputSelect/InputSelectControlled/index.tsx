import { Control, Controller } from 'react-hook-form';
import { InputSelect, InputSelectProps } from '../';

interface InputSelectControlledProps extends InputSelectProps {
  control: Control<any>;
  name: string;
}

const InputSelectControlled: React.FC<InputSelectControlledProps> = ({
  control,
  name,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <InputSelect
            onValueChange={onChange}
            selectedValue={value}
            {...rest}
          />
        );
      }}
      name={name}
    />
  );
};

export { InputSelectControlled };
