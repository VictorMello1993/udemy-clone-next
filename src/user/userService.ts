import type { Session } from "next-auth";
import * as userRepository from "./userRepository";
import bcrypt from "bcrypt";

export type UserSession = {
  userId: string;
  email: string;
  fullname: string;
};

export async function credentialsLogin(email: string, password: string) {
  const maybeUser = await userRepository.findByEmail(email, {
    select: {
      id: true,
      password: true,
    },
  });

  if (maybeUser !== null && maybeUser.password) {
    const isLoginSuccess = await bcrypt.compare(password, maybeUser.password);

    if (isLoginSuccess) {
      return {
        success: true as true,
        id: maybeUser.id.toString(),
      };
    }
  }

  return {
    success: false as false,
  };
}

export async function getUserSessionData(email: string) {
  const maybeUser = await userRepository.findByEmail(email, {
    select: {
      id: true,
      password: true,
      email: true,
      fullname: true,
    },
  });

  const userSession: Session["user"] = {
    userId: maybeUser?.id ?? NaN,
    email: maybeUser?.email ?? "",
    fullname: maybeUser?.fullname ?? "",
  };

  return userSession;
}
