import type { NextApiRequest, NextApiResponse, GetServerSidePropsContext } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/react";
import { unstable_getServerSession as unstableGetServerSession } from "next-auth/next";

export function getServerSession(req: NextApiRequest | GetServerSidePropsContext["req"], res: NextApiResponse | GetServerSidePropsContext["res"]) {
  // return getSession();
  return unstableGetServerSession(req, res, authOptions);
}
