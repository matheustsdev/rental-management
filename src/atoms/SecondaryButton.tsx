import { Button, ButtonProps } from "@chakra-ui/react";

type IPrimaryButtonProps = Omit<ButtonProps, "bg" | "px">;

const SecondaryButton: React.FC<IPrimaryButtonProps> = ({ ...rest }) => {
  return (
    <Button
      px="4"
      borderWidth="thin"
      borderColor="terracotta.500"
      _hover={{ bg: "taupe.50" }}
      color="black"
      {...rest}
    />
  );
};

export default SecondaryButton;
