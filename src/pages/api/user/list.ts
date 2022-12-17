import type { NextApiRequest, NextApiResponse } from "next";
import * as userRepository from "../../../user/userRepository";

export default async function findAllUsers(req: NextApiRequest, res: NextApiResponse) {
  const users = await userRepository.findMany({
    select: {
      id: true,
      fullname: true,
    },
  });

  return res.status(200).json(users);
}
