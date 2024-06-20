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
import { User } from "@/models/userModel";
import { redirect } from "react-router-dom";
import {connectToDatabase} from '@/lib/utils'

const signupfunction = async (formdata: FormData) => {
  "use server";
  const name = formdata.get("name") as string | undefined;
  const email = formdata.get("email") as string | undefined;
  const password = formdata.get("password") as string | undefined;

  if (!name || !email || !password) {
    console.log("something missing");
    throw new Error("please provide all fields");
  }

  // Connect with database here
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (user) {
    // alert("already existing user");
    redirect("/login");
  }

  await User.create({
    name, email, password
  });

  redirect("/login");
}

function Signup() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signupfunction} className="flex flex-col gap-4">
            <Input placeholder='Name' name='name'></Input>
            <Input placeholder='Email' type='email' name='email' />
            <Input placeholder='Password' type='password' name='password'></Input>
            <Button type='submit'>Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form action="">
            <Button type='submit' variant={'outline'}>Login with Google</Button>
          </form>
          <Link className='mt-2' href="/login">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
