import { EHierarchyStyle } from "../constants/EHierarchyStyle";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { TableTitleButtonsType } from "../types/TableTitleButtonType";

interface IButtonProps extends Omit<ButtonProps, "onClick" | "title">, TableTitleButtonsType {} 

export function Button({ title, leftIcon, rightIcon, hierarchy = EHierarchyStyle.PRIMARY, onClick, ...rest }: IButtonProps) {
    return (
        <ChakraButton 
            leftIcon={leftIcon ?? undefined} 
            rightIcon={rightIcon ?? undefined} 
            onClick={onClick}
            rounded="md"
            bg={hierarchy === EHierarchyStyle.PRIMARY ? "primary.500" : "transparent"}
            _hover={{bg: hierarchy === EHierarchyStyle.PRIMARY ? "primary.600" : "secondary.500"}}
            color={hierarchy === EHierarchyStyle.PRIMARY ? "white" : "black"}
            borderWidth={hierarchy === EHierarchyStyle.PRIMARY ? "0px" : "2px"}
            borderColor="secondary.500"
            {...rest}
        >
            {title}
        </ChakraButton>
    )
}