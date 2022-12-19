import { z } from "zod";
import { userSchema } from "./userSchema";

export const updateUserSchema = userSchema
  .extend({
    id: z.string(),
  })
  .omit({
    password: true,
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
