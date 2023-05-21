import { Control, Controller, FieldErrors } from 'react-hook-form';
import { InputText, InputTextProps } from '../';
import { applyMask } from '@utils/applyMask';

interface InputTextControlledProps extends InputTextProps {
  control: Control<any>;
  name: string;
  errors: FieldErrors<any>;
  mask?: string;
}

const InputTextControlled: React.FC<InputTextControlledProps> = ({
  control,
  name,
  errors,
  mask,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <InputText
            onChangeText={(text) =>
              onChange(mask ? applyMask(text, mask) : text)
            }
            value={value}
            error={errors[name] && (errors[name]?.message as string)}
            {...rest}
          />
        );
      }}
      name={name}
    />
  );
};

export { InputTextControlled };
