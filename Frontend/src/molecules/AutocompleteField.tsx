import React from "react";
import { FormControl, FormLabel, FormErrorMessage, InputProps } from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Control, FieldValues, UseFormSetValue, FieldPath, Controller } from "react-hook-form";

interface IAutocompleteFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputProps {
    control: Control<TFieldValues, any>;
    setValue: UseFormSetValue<TFieldValues>;
    name: TName;
    label: string;
    options: { id: string, [key: string]: any }[];
    optionsLabel?: (option: { id: string, [key: string]: any }) => string;
    error?: string;
}

export function AutocompleteField<TFieldValues extends FieldValues>({
    control,
    setValue,
    name,
    label,
    error,
    options,
    optionsLabel = (option) => option.name || option.id,
    ...rest
}: IAutocompleteFieldProps<TFieldValues>) {
    const handleChange = (_: string, item: typeof options[0]) => {
        setValue(name, item.originalValue);
    };

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <AutoComplete
                        openOnFocus
                        listAllValuesOnFocus
                        onChange={handleChange}
                    >
                        <AutoCompleteInput
                            variant="filled"
                            borderColor="inherit"
                            bg="inherit"
                            borderWidth="1px"
                            _hover={{ bg: "unset" }}
                            {...field}
                            {...rest}
                        />
                        <AutoCompleteList>
                            {options.map((option) => (
                                <AutoCompleteItem
                                    key={`option-${option.id}`}
                                    value={option}
                                    label={optionsLabel(option)}
                                    textTransform="capitalize"
                                />
                            ))}
                        </AutoCompleteList>
                    </AutoComplete>
                )}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
}
