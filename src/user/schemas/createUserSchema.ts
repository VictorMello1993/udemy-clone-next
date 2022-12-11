import { userSchema } from "./userSchema";
import * as userRepository from "../../userRepository";

const messages = {
  emailExists: "Esse e-mail já está cadastrado",
};

export const createUserSchema = userSchema
  .transform((user) => ({
    ...user,
    fullname: user.fullname.trim(),
  }))
  .refine(
    async ({ email }) => {
      const user = await userRepository.findByEmail(email);
      return user === null;
    },
    {
      message: messages.emailExists,
      path: ["email"],
    },
  );
