import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import {authOptions} from "./options"
// import { signIn } from 'next-auth/react';
// const handler=NextAuth(authOptions);
import { handler } from './auth';
export {handler as GET,handler as POST,handler as PUT}