import { NextRequest, NextResponse } from "next/server";
import { protectedRoute, publicRoute } from "./lib/routes";
import NextAuth from "next-auth/next";
import { authOptions } from "./lib/authOptions";
// const {auth}=NextAuth(authOptions);
// export default auth((request:any)=>{
  // const session=await getServerSession();
  // const isLoggedIn=session?.user?true:false;
  export default function auth(request:any){
  const isLoggedIn=true;
  // const isLoggedIn = !!request.auth;
  // console.log("session:",session)
  // console.log("Request:",request)
  const { nextUrl } = request;
  console.log("URL:", request.nextUrl.pathname);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoute.includes(nextUrl.pathname);
  if (isPublicRoute) {
    return null;
  }
  if (isProtectedRoute && isLoggedIn) {
    return null;
  }
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }
  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }
  return null;
};
export const config = {
  mathcer: ["/", "/all-events"],
};
