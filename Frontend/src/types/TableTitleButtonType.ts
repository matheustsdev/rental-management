import { ReactElement } from "react";
import { EHierarchyStyle } from "../constants/EHierarchyStyle";

export type TableTitleButtonsType = {
    title: string,
    leftIcon?: ReactElement,
    rightIcon?: ReactElement,
    type?: EHierarchyStyle,
    onClick: () => void
}