import { ReactElement } from "react";
import { EHierarchyStyle } from "../constants/EHierarchyStyle";

export type TableTitleButtonsType = {
    title: string,
    leftIcon?: ReactElement,
    rightIcon?: ReactElement,
    hierarchy?: EHierarchyStyle,
    onClick?: () => void
}