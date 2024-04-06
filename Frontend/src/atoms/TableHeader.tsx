import { Th, Thead } from "@chakra-ui/react";
import { TableColumnType } from "../types/TableColumnType";

interface ITableHeaderProps {
    columns: TableColumnType[];
}

export function TableHeader({ columns }: ITableHeaderProps) {
    return (
        <Thead>
            {
                columns.map((column) => (
                    <Th key={column.name} p="1rem 0" textAlign="center">
                        <span>{column.name}</span>
                    </Th>
                ))
            }
        </Thead>
    )
}