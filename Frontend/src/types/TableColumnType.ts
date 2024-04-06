// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableColumnType<T = any> = {
    name: string,
    propertyName: keyof T
}