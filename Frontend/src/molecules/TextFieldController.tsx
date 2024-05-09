import { FormControl, FormLabel, Input, FormErrorMessage, ComponentWithAs, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { Control, FieldValues, Path, PathValue, UseFormSetValue, FieldPath } from "react-hook-form";

interface ITextFieldControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputProps {
    control: Control<TFieldValues, any>;
    setValue: UseFormSetValue<TFieldValues>;
    name:  TName;
    label: string;
    error?: string;
}

interface ComponentRef {
    ref: any;
}

export const TextFieldController = forwardRef<ComponentRef, ITextFieldControllerProps<FieldValues>>(function TextFieldController<T extends FieldValues>({ control, setValue, name, label, error,...rest }: ITextFieldControllerProps<T>, ref: any) {
    return (
        <FormControl isInvalid={!!error} ref={ref}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id={name} onChange={(e) => setValue(name, e.target.value as PathValue<T, Path<T>>)} {...control} {...rest} ref={ref}/>
            <FormErrorMessage>
                { error }
            </FormErrorMessage>
        </FormControl>
    )    
})