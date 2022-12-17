import * as userRepository from "../../user/userRepository";
import type { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({ user: { fullname } }: ProfilePageProps) {
  return <h1>{`Bem vindo, ${fullname}!`}</h1>;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async () => {
  const session = await getSession();

  const user = (await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  })) as userRepository.User;

  return { props: { user } };
};
