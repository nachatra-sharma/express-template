import z from "zod";

export const envSchema = z.number().positive().int();
