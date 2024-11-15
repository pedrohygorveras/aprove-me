import { authService } from "@/services/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: {
          label: "login",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const login = credentials?.login;
        const password = credentials?.password;

        if (!login || !password) {
          throw new Error("Invalid credentials");
        }

        const response = await authService.login(login, password);

        console.log(response);

        // // if (!response || !response.user) {
        // console.log("22222222222222");
        // throw new Error("User not found or invalid credentials");
        // // }

        // console.log(response);

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
