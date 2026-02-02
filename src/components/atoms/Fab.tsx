import { Button, ButtonProps } from "@chakra-ui/react";

type IPrimaryButtonProps = Omit<ButtonProps, "bg" | "px">;

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({ ...rest }) => {
  return (
    <Button
      px="4"
      py="8"
      borderRadius="full"
      bg="primary.500"
      color="white"
      pos="fixed"
      bottom="4"
      right="4"
      zIndex="10"
      {...rest}
    />
  );
};

export default PrimaryButton;
