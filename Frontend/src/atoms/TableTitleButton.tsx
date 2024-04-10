import { EHierarchyStyle } from "../constants/EHierarchyStyle";
import { Button } from "@chakra-ui/react";
import { TableTitleButtonsType } from "../types/TableTitleButtonType";

export function TableTitleButton({ title, leftIcon, rightIcon, type = EHierarchyStyle.PRIMARY, onClick }: TableTitleButtonsType) {
    return (
        <Button 
            leftIcon={leftIcon ?? undefined} 
            rightIcon={rightIcon ?? undefined} 
            onClick={onClick}
            rounded="md"
            bg={type === EHierarchyStyle.PRIMARY ? "primary.500" : "transparent"}
            _hover={{bg: type === EHierarchyStyle.PRIMARY ? "primary.600" : "secondary.500"}}
            color={type === EHierarchyStyle.PRIMARY ? "white" : "black"}
            borderWidth={type === EHierarchyStyle.PRIMARY ? "0px" : "2px"}
            borderColor="secondary.500"
        >
            {title}
        </Button>
    )
}