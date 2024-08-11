import { Th, Thead } from "@chakra-ui/react";
import { TableColumnType } from "../types/tableColumnType";

interface ITableHeaderProps {
    columns: TableColumnType[];
}

export function TableHeader({ columns }: ITableHeaderProps) {
    return (
        <Thead>
            {
                columns.map((column) => (
                    <Th key={column.name} p="1rem 0" textAlign="center" bg="primary.500" color="white">
                        <span>{column.name}</span>
                    </Th>
                ))
            }
        </Thead>
    )
}