import { GetServerSideProps } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface UsersPageProps {
  users: User[];
}

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <div>
      {users.map(({ id, name, email }) => (
        <div key={id}>
          Id {id} <br />
          Name {name}
          <br />
          email {email}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async () => {
  const users = await prisma.user.findMany();

  return {
    props: {
      users,
    },
  };
};
