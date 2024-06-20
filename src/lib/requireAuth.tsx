// lib/requireAuth.tsx
"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react';

export function requireAuth(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.replace('/login');
      }
    }, [status, router]);

    if (status === 'loading') {
      return <div>Loading</div>;
    }

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
}
