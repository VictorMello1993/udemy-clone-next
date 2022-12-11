import type { NextApiRequest, NextApiResponse } from "next";

export default function SignUpHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(req.body);
}
