import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  fullname: z.string().min(1, "O campo nome completo é obrigatório").max(60, "O nome completo deve ser preenchido até 60 caracteres"),
  email: z.string().email("E-mail inválido"),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
