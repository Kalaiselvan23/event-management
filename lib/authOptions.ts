import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret:process.env.NEXT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const res = await fetch("http://localhost:3000/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        console.log("user",user)
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // callbacks:{
  //   signIn:async(params:any)=>{
  //     console.log("callbacks",params);
  //     return true
  //   },
  //   jwt:async({token}:any)=>
  //   {
  //     console.log("jwt:",token);
  //     return token;
  //   },
  //   session:async({token}:any)=>
  //   {
  //     console.log("session-token",token);
  //     return token
  //   }
  // },
  pages:{
    signIn:"/auth",
  },

};
