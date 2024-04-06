import { Input, InputLeftElement, InputGroup, InputGroupProps } from '@chakra-ui/react';
import { Search } from "lucide-react";

interface ISearchFieldProps extends InputGroupProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchField({value, onChange, ...rest }: ISearchFieldProps) {
    return (
        <InputGroup {...rest}>
            <InputLeftElement>
                <Search />
            </InputLeftElement>
            <Input colorScheme='pink' value={value} onChange={onChange} />
        </InputGroup>
    )
}