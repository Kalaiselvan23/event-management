import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile, token): any {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "USER",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Gmail",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: req.body?.email,
            password: req.body?.password,
          },
        });
        console.log(user)
        if (user) return user;
        return null;
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return { ...token, user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
      });
      session.user.id = user?.id || "";
      session.user.role = user?.role || "USER";
      return { ...session };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
