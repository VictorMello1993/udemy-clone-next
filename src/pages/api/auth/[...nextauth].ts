import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as userService from "../../../../src/user/userService";

export const authOptions: AuthOptions = {
  callbacks: {
    redirect() {
      return "/";
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
        const { success, userSession } = await userService.login(email, password);

        console.log("userSession", userSession);
        console.log("success", success);

        if (success) {
          return {
            id: userSession.userId,
            email: userSession.email,
            name: userSession.fullname,
          };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
