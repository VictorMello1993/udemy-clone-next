import { PrismaClient, User } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";

export type UserPageProps = User;

export type UserQuery = {
  id: string;
};

const prisma = new PrismaClient();

export default function UserPage({ id, name, email }: UserPageProps) {
  return (
    <div>
      <div key={id}>
        Id {id} <br />
        Name {name}
        <br />
        email {email}
        <br />
        <br />
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps<UserPageProps, UserQuery> = async ({ params }) => {
  const user = (await prisma.user.findFirst({
    where: {
      id: Number(params?.id),
    },
  })) as User;

  return {
    props: user,
  };
};

export const getStaticPaths: GetStaticPaths<UserQuery> = async () => {
  const usersIds = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: usersIds.map((user) => ({
      params: { id: user.id.toString() },
    })),
    fallback: false,
  };
};
