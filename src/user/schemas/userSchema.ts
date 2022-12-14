import { z } from "zod";

const fullNameMaxLength = 60;
const passwordMinLength = 8;
const passwordMaxLength = 20;

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

const password = z
  .string()
  .min(passwordMinLength, { message: messages.min("Senha", passwordMinLength) })
  .max(passwordMaxLength, { message: messages.max("Senha", passwordMaxLength) });

const subscribeToEmail = z.boolean().optional();

export const userSchema = z.object({
  fullname,
  email,
  password,
});

export type UserSchema = z.infer<typeof userSchema>;
