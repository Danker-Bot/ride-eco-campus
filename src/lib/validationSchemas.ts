import { z } from "zod";

// Auth validation schemas
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Correo electrónico inválido" })
    .max(255, { message: "El correo no puede exceder 255 caracteres" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña no puede exceder 100 caracteres" }),
  fullName: z
    .string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres" }),
});

// Vehicle validation schema
export const vehicleSchema = z.object({
  model: z
    .string()
    .trim()
    .min(1, { message: "El modelo es requerido" })
    .max(100, { message: "El modelo no puede exceder 100 caracteres" }),
  color: z
    .string()
    .trim()
    .min(1, { message: "El color es requerido" })
    .max(50, { message: "El color no puede exceder 50 caracteres" }),
  licensePlate: z
    .string()
    .trim()
    .min(1, { message: "La patente es requerida" })
    .max(20, { message: "La patente no puede exceder 20 caracteres" })
    .regex(/^[A-Z0-9]+$/, {
      message: "La patente solo puede contener letras mayúsculas y números",
    }),
  seats: z
    .number()
    .int()
    .min(1, { message: "Debe haber al menos 1 asiento" })
    .max(8, { message: "No puede haber más de 8 asientos" }),
});

// Trip validation schema
export const tripSchema = z.object({
  origin: z
    .string()
    .trim()
    .min(1, { message: "El origen es requerido" })
    .max(500, { message: "El origen no puede exceder 500 caracteres" }),
  destination: z
    .string()
    .trim()
    .min(1, { message: "El destino es requerido" })
    .max(500, { message: "El destino no puede exceder 500 caracteres" }),
  seats: z
    .number()
    .int()
    .min(1, { message: "Debe haber al menos 1 asiento disponible" })
    .max(8, { message: "No puede haber más de 8 asientos disponibles" }),
});

// Audio note validation
export const audioNoteSchema = z
  .string()
  .max(10000, { message: "La nota de audio no puede exceder 10000 caracteres" })
  .optional();
