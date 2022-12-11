import type { NextApiRequest, NextApiResponse } from "next";
import * as userRepository from "../../userRepository";

export default async function SignUpHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const results = await userRepository.create(req.body, {
      select: {
        id: true,
      },
    });
    return res.status(200).json(results);
  }

  return res.status(200).json({});
}
