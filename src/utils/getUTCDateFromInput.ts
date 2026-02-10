export function getUTCDateFromInput(inputDate: string | Date): Date {
    return typeof inputDate === "string" && !inputDate.includes("T")
        ? new Date(inputDate + "T00:00:00")
        : new Date(inputDate)
}