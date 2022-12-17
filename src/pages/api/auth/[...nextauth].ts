import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as userService from "../../../../src/user/userService";

export const authOptions: AuthOptions = {
  callbacks: {
    redirect() {
      return "/user/profile";
    },
    async session({ session }) {
      const userSession = await userService.getUserSessionData(session.user.email);
      session.user = userSession;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Senha", type: "password", placeholder: "Senha" },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username: email, password } = credentials;
        const { success, id } = await userService.credentialsLogin(email, password);

        if (success) {
          return {
            id,
            email,
          };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
