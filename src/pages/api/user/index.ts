import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import * as userRepository from "../../../user/userRepository";

export default async function getUserSession(req: NextApiRequest | GetServerSidePropsContext["req"], res: NextApiResponse | GetServerSidePropsContext["res"]) {
  const session = await getSession();

  const user = await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  });

  return [200, user as userRepository.User];
}
