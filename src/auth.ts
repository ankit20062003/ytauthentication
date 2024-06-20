import NextAuth, {CredentialsSignin} from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { Poltawski_Nowy } from "next/font/google"
import passage from "next-auth/providers/passage";
import { User } from "./models/userModel";
import { connectToDatabase } from "./lib/utils";


// todo
// connect with db
// with google for login and signup both


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
    CredentialProvider({
        name: "Credentials",
        credentials: {
            email : {
                label :"Email",
                type : "email",
            },
            password :{label : "Password" , type : "password"},
        },

        authorize : async (credentials) =>{
            const email = credentials.email as string | undefined
            const password = credentials.password as string | undefined
            console.log(email, password)

            if(!email || !password)
                throw new Error("plase provide email and password" );


            // connect with database here
            await connectToDatabase();

        const user = await User.findOne({email}).select("+password");
        
        if(!user)throw new CredentialsSignin("Invalid email or password");

        if(!password)throw new CredentialsSignin("Invalid email or password");

        // match from database 
        const isMatch = user.password === password; //can use decrypt here 
        if(!isMatch)throw new CredentialsSignin("Invalid email or password");
       
        return {name : user.name , email : user.email , id  : user.id};
        },
    }),
    
  ],

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  }
});