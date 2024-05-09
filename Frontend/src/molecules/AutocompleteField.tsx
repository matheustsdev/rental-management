
import { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, MenuList, FormControl, FormLabel, Input, FormErrorMessage, ComponentWithAs, InputProps } from "@chakra-ui/react";
import { TextFieldController } from "./TextFieldController";
import { Control, FieldValues, UseFormSetValue, Path, FieldPath } from "react-hook-form";

interface IAutocompleteFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputProps {
    control: Control<TFieldValues, any>;
    setValue: UseFormSetValue<TFieldValues>;
    name:  TName;
    label: string;
    options: {id: string, [key: string]: any}[];
    optionsLabel?: (option: {id: string, [key: string]: any}) => string;
    error?: string;
}

export function AutocompleteField<T extends FieldValues>({ control, setValue, name, label, error, options, optionsLabel, ...rest }: IAutocompleteFieldProps<T>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isMenuFocused, setIsMenuFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState<typeof options[0] | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    function getValueLabel(option: {id: string, [key: string]: any} | null) {
        if (!option) return "";

        return optionsLabel ? optionsLabel(option) : (option.name ? option.name : option.id);
    }

    useEffect(() => { console.log(ref) }, [ref]);
    useEffect(() => {   
        if (!isMenuFocused && !isInputFocused) {
            setIsMenuOpen(false);
        }

        if (isMenuFocused || isInputFocused) {
            setIsMenuOpen(true);
        }
    }, [isMenuFocused, isInputFocused])

    useEffect(() => {
        console.log(isInputFocused);
    }, [isInputFocused]);

    return (
        <Menu isOpen={isMenuOpen} placement="right-start" gutter={0}>
            <FormControl isInvalid={!!error} ref={ref}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Input id={name} onChange={(e) => setValue(name, e.target.value as any)} value={getValueLabel(selectedOption)} onFocus={() => setIsInputFocused(true)} {...control} {...rest} ref={ref}/>
                <FormErrorMessage>
                    { error }
                </FormErrorMessage>
            </FormControl>
            <MenuList
                left={ref.current ? (ref.current?.offsetLeft + "px") : "0px"}
                top={ref.current ? (ref.current?.offsetTop + ref.current?.offsetHeight + "px") : "0px"}
                pos="relative"
                onFocus={() => setIsMenuFocused(true)}
                onBlur={() => setIsMenuFocused(false)}
                onChange={() => setIsMenuFocused(true)}
            >
                {
                    options.map((option) => (
                        <MenuItem  
                            key={option.id} 
                            onClick={() => { 
                                setSelectedOption(option); 
                                setIsMenuOpen(false);
                                setIsInputFocused(false);
                                setIsMenuFocused(false);
                                setValue(name, option as any) 
                            }}>
                                {
                                    optionsLabel ? optionsLabel(option) : (option.name ? option.name : option.id)
                                }
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
}