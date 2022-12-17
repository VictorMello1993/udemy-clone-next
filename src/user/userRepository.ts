import type { Prisma, User } from "@prisma/client";
import { prismaClient as p } from "../../src/prismaClient";
import { createUserSchema } from "./schemas/createUserSchema";

export type { User } from "@prisma/client";

export function findById(id: number, args: Omit<Prisma.UserFindFirstArgs, "where"> = {}) {
  return p.user.findFirst({
    ...args,
    where: { id },
  });
}

export function findByEmail(email: string, args: Omit<Prisma.UserFindUniqueArgs, "where"> = {}) {
  return p.user.findUnique({
    ...args,
    where: { email },
  });
}

export async function create(user: User, args: Omit<Prisma.UserCreateArgs, "data"> = {}) {
  const userValidation = await createUserSchema.safeParseAsync(user);

  if (userValidation.success) {
    const user = await p.user.create({
      ...args,
      data: userValidation.data,
    });

    return { user };
  } else {
    return {
      errors: userValidation.error.errors,
    };
  }
}

export async function findMany(args: Omit<Prisma.UserFindManyArgs, "data"> = {}) {
  return p.user.findMany(args);
}
