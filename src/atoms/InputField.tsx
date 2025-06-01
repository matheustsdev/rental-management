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
  return (
    <Field.Root invalid={!!error} gap="0">
      <Field.Label>{label}</Field.Label>
      <InputGroup {...inputGroupProps}>
        <Input px="2" placeholder={placeholder} {...registerProps} {...inputProps} />
      </InputGroup>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default InputField;
