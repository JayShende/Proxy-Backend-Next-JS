import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { client } from "./app/lib";

// we also need to import the prisma client

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(client),

  callbacks: {
    async session({ session, token }) {
      // console.log(session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});