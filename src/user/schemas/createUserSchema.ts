import bcrypt from "bcrypt";
import { userSchema } from "./userSchema";
import * as userRepository from "../userRepository";

const messages = {
  emailExists: "Esse e-mail já está cadastrado",
};

export const createUserSchema = userSchema
  .transform(async (user) => ({
    ...user,
    fullname: user.fullname.trim(),
    password: await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
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
