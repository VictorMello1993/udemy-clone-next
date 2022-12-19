import * as userRepository from "../../user/userRepository";
import type { GetServerSideProps } from "next";
import { getServerSession } from "../../auth/getServerSession";
import { ProfileForm } from "../../user/components/ProfileForm";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({ user }: ProfilePageProps) {
  return <ProfileForm user={user} />;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ req, res }) => {
  const session = await getServerSession(req, res);

  const user = (await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  })) as userRepository.User;

  return { props: { user } };
};
