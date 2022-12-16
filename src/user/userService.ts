import * as userRepository from "./userRepository";
import bcrypt from "bcrypt";

export type UserSession = {
  userId: string;
  email: string;
  fullname: string;
};

export async function login(email: string, password: string) {
  const maybeUser = await userRepository.findByEmail(email, {
    select: {
      id: true,
      password: true,
      email: true,
      fullname: true,
    },
  });

  if (maybeUser) {
    const isLoginSuccess = await bcrypt.compare(password, maybeUser?.password);

    if (isLoginSuccess) {
      const userSession: UserSession = {
        userId: maybeUser.id.toString(),
        email: maybeUser.email,
        fullname: maybeUser.fullname,
      };

      return {
        success: true as true,
        userSession,
      };
    }
  }

  return {
    success: false as false,
    userSession: undefined,
  };
}
