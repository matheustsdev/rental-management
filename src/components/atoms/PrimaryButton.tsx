import { Button, ButtonProps } from "@chakra-ui/react";

type IPrimaryButtonProps = Omit<ButtonProps, "bg" | "px">;

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({ ...rest }) => {
  return <Button px="2" bg="primary.500" color="white" {...rest} />;
};

export default PrimaryButton;
