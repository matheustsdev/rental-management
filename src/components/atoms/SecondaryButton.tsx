import { Button, ButtonProps } from "@chakra-ui/react";

type IPrimaryButtonProps = Omit<ButtonProps, "bg" | "px">;

const SecondaryButton: React.FC<IPrimaryButtonProps> = ({ ...rest }) => {
  return (
    <Button
      px="4"
      borderColor="secondary.500"
      borderWidth="thin"
      background="transparent"
      color="black"
      _hover={{ bg: "taupe.100" }}
      {...rest}
    />
  );
};

export default SecondaryButton;
