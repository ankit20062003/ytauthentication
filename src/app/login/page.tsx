import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CredentialsSignin } from 'next-auth'
import { signIn } from '@/auth';


const loginhandler = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !password) throw new Error("please provide all fields");

  try {

    await signIn("credentials",  {
      email, password, redirect: true, redirectTo: "/",
    });

  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
}


function Page() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginhandler} className="flex flex-col gap-4">
            <Input placeholder="email" type="email" name="email" />
            <Input placeholder='Password' type="password" name="password" ></Input>
            <Button type="submit">Login</Button>
          </form>

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form action="">
            <Button type='submit' variant={'outline'}>Login with Google</Button>
          </form>

          {/* singup page */}
          <Link href="/signup">Dont have an account ? Signup</Link>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Page
