// src/atoms/InputField.tsx
"use client";

import { Field, Textarea, TextareaProps } from "@chakra-ui/react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface IInputAreaFieldProps extends TextareaProps {
  label: string;
  registerProps?: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

const InputAreaField: React.FC<IInputAreaFieldProps> = ({
  label,
  registerProps,
  error,
  placeholder,
  ...inputProps
}) => {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label>{label}</Field.Label>
      <Textarea px="2" placeholder={placeholder} {...registerProps} {...inputProps} />
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default InputAreaField;
