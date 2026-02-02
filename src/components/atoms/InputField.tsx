"use client";
import { Input, InputProps, Field, InputGroup, InputGroupProps } from "@chakra-ui/react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface IInputFieldProps extends InputProps {
  label: string;
  registerProps?: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  inputGroupProps?: Omit<InputGroupProps, "children">;
}

const InputField: React.FC<IInputFieldProps> = ({
  label,
  registerProps,
  error,
  placeholder,
  inputGroupProps,
  ...inputProps
}) => {
  // separa o onChange original do RHF
  const { onChange: registerOnChange, ...restRegister } = registerProps || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (registerOnChange) {
      if (inputProps.type === "number") {
        const rawValue = e.target.value;
        const numeric = rawValue === "" ? undefined : parseFloat(rawValue);

        // Clone event changing the target value
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: numeric },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        registerOnChange(e);

        return;
      }

      if (inputProps.type === "date") {
        const rawValue = e.target.value;
        const dateValue = rawValue ? new Date(rawValue) : undefined;
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: dateValue },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        registerOnChange(e);

        return;
      }

      registerOnChange(e);
    }
  };

  return (
    <Field.Root invalid={!!error} gap="0" minH="20">
      <Field.Label>{label}</Field.Label>
      <InputGroup {...inputGroupProps}>
        <Input px="2" placeholder={placeholder} {...inputProps} {...restRegister} onChange={handleChange} />
      </InputGroup>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default InputField;
