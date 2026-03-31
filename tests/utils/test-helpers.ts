import { addDays, subDays } from "date-fns";

/**
 * Retorna uma data relativa ao dia atual
 */
export const daysFromNow = (days: number): Date => {
  return addDays(new Date(), days);
};

/**
 * Retorna uma data no passado relativa ao dia atual
 */
export const daysBeforeNow = (days: number): Date => {
  return subDays(new Date(), days);
};

/**
 * Helper para lidar com datas em formato ISO string
 */
export const toISO = (date: Date): string => {
  return date.toISOString();
};
