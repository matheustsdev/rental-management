import { FormControl, FormLabel, Input, FormErrorMessage, InputProps } from "@chakra-ui/react";
import { Control, FieldValues, FieldPath, Controller } from "react-hook-form";

interface ITextFieldControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputProps {
    control: Control<TFieldValues, any>;
    name: TName;
    label: string;
    error?: string;
}

export function TextFieldController<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    error,
    ...rest
}: ITextFieldControllerProps<TFieldValues>) {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        id={name}
                        {...rest}
                    />
                )}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
}
