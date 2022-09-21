import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import Firebase from "Firebase/app";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "../../../firebase/firebase";
import "./components/accessToken";
import { MongoClient } from "mongodb";

export default NextAuth({
  providers: [
    GithubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  adapter: FirestoreAdapter(db),
});
