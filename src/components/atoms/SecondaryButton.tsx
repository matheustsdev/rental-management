import { Button, ButtonProps } from "@chakra-ui/react";

type IPrimaryButtonProps = Omit<ButtonProps, "bg" | "px">;

const SecondaryButton: React.FC<IPrimaryButtonProps> = ({ ...rest }) => {
  return <Button px="4" borderWidth="thin" background="terracotta.500" _hover={{ bg: "taupe.300" }} {...rest} />;
};

export default SecondaryButton;
