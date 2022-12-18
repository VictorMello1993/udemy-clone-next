import { z } from "zod";

const fullNameMaxLength = 60;

const messages = {
  max: (field: string, length: number) => `O campo ${field} deve ser preechido até ${length} caracteres`,
  min: (field: string, length: number) => `O campo ${field} deve ser preenchido com pelo menos ${length} caracteres`,
  email: (field: string) => `${field} inválido`,
  required: (field: string) => `O campo ${field} é obrigatório`,
};

const fullname = z
  .string()
  .min(1, { message: messages.required("nome completo") })
  .max(fullNameMaxLength, {
    message: messages.max("nome completo", fullNameMaxLength),
  });

const email = z.string().email({ message: messages.email("E-mail") });

export const updateUserSchema = z.object({
  fullname,
  email,
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
