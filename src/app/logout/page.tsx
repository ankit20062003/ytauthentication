'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



const logoutHandler = async () => {
  await signOut({ redirect: true, callbackUrl: '/login' });
};



function LogoutPage() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>Are you sure you want to logout?</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={logoutHandler}>Logout</Button>
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LogoutPage;
