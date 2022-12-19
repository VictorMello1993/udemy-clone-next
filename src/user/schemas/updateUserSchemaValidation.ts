import { updateUserSchema } from "./updateUserSchema";
import * as userRepository from "../userRepository";

const messages = {
  emailExists: "Esse e-mail já está cadastrado",
};

export const updateUserSchemaValidation = updateUserSchema.refine(
  async ({ email, id }) => {
    const user = await userRepository.findByEmail(email);
    return user === null || (user?.email === email && user?.id.toString() === id);
  },
  {
    message: messages.emailExists,
    path: ["email"],
  },
);
