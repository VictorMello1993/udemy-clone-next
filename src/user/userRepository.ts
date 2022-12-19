import type { Prisma, User } from "@prisma/client";
import { prismaClient as p } from "../../src/prismaClient";
import { createUserSchema } from "./schemas/createUserSchema";
import { updateUserSchemaValidation } from "./schemas/updateUserSchemaValidation";

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
    where: {
      email,
    },
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

export async function update(user: { id: number; fullname: string; email: string }) {
  const userValidation = await updateUserSchemaValidation.safeParseAsync(user);

  if (userValidation.success) {
    const updatedUser = await p.user.update({
      where: {
        id: Number(userValidation.data.id),
      },
      data: {
        id: Number(userValidation.data.id),
        fullname: userValidation.data.fullname,
        email: userValidation.data.email,
      },
    });

    return { updatedUser };
  } else {
    return {
      errors: userValidation.error.errors,
    };
  }
}
