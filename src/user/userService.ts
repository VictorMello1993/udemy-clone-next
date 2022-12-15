import * as userRepository from "./userRepository";
import bcrypt from "bcrypt";

export type UserSession = {
  userId: number;
  email: string;
  fullname: string;
};

export async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email, {
    select: {
      id: true,
      password: true,
      email: true,
      fullname: true,
    },
  });

  if (user) {
    const isLoginSuccess = await bcrypt.compare(password, user.password);

    if (isLoginSuccess) {
      const userSession: UserSession = {
        userId: user.id,
        email: user.email,
        fullname: user.fullname,
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
