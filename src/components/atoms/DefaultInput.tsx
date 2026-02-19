"use client";
import { Input, InputProps, Field, InputGroup, InputGroupProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface IDefaultInputProps extends InputProps {
  label: string;
  error?: FieldError;
  placeholder?: string;
  inputGroupProps?: Omit<InputGroupProps, "children">;
}

const DefaultInput: React.FC<IDefaultInputProps> = ({ label, error, placeholder, inputGroupProps, ...inputProps }) => {
  return (
    <Field.Root invalid={!!error} gap="0" minH="20">
      <Field.Label>{label}</Field.Label>
      <InputGroup {...inputGroupProps}>
        <Input px="2" placeholder={placeholder} {...inputProps} />
      </InputGroup>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default DefaultInput;
