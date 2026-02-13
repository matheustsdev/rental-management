import { Tag as ChakraTag, TagRootProps } from "@chakra-ui/react";

interface ITagProps extends TagRootProps {
  label: string;
}

const Tag: React.FC<ITagProps> = ({ label, ...rest }) => {
  return (
    <ChakraTag.Root
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      color="white"
      variant="solid"
      {...rest}
    >
      <ChakraTag.Label>{label}</ChakraTag.Label>
    </ChakraTag.Root>
  );
};

export default Tag;
