"use client";
import { Input, InputProps, Field, InputGroup, Icon, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface ISearchBarProps extends InputProps {
  isLoading?: boolean;
}

const SearchBar: React.FC<ISearchBarProps> = ({ isLoading, ...inputProps }) => {
  return (
    <Field.Root gap="0" minH="20" maxW="96">
      <InputGroup endElement={<Icon mr="4">{isLoading ? <Spinner /> : <FaSearch />}</Icon>}>
        <Input px="2" placeholder="Buscar..." {...inputProps} />
      </InputGroup>
    </Field.Root>
  );
};

export default SearchBar;
