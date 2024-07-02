import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret:process.env.NEXT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
      
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  
  pages:{
    signIn:"/auth",
  },

};
