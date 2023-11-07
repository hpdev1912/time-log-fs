'use client';
import React from 'react';
import { Button } from './ui/button';
import { IoTimer } from 'react-icons/io5';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const supapase = createClientComponentClient();
  const router = useRouter();
  const path = usePathname();
  const handleLogout = async () => {
    await supapase.auth.signOut();
    router.refresh();
  };
  const isAuthPage = path === '/auth';
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <IoTimer className="text-xl" />
        <h1>Time</h1>
      </div>
      {!isAuthPage && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}
