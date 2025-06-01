import { z } from "zod";
import { EMeasureType } from "./EMeasureType";

export const suitMeasureFieldsSchema = {
    waist: z.number(),
    sleeve: z.number(),
    height: z.number(),
    back: z.number()
};

export const dressMeasureFieldsSchema = {
    waist: z.number(),
    bust: z.number(),
    hip: z.number(),
    shoulder: z.number()
};

export const measureFieldsSchemas = {
    [EMeasureType.DRESS]: dressMeasureFieldsSchema,
    [EMeasureType.SUIT]: suitMeasureFieldsSchema,
};

export const measureFieldsLabels = {
    [EMeasureType.DRESS]: {
        waist: "Cintura",
        bust: "Busto",
        hip: "Quadril",
        shoulder: "Ombro"
    },
    [EMeasureType.SUIT]: {
        waist: "Cintura",
        sleeve: "Manga",
        height: "Altura",
        back: "Costa"
    }
}