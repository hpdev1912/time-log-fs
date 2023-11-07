import Calendar from '@/components/Calendar';
import Logs from '@/components/Logs';
import Navbar from '@/components/Navbar';
import NewLog from '@/components/NewLog';
import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import InitLog from './components/InitLog';
import { ILog } from '@/store';

export default async function Home() {
  const supapase = createServerComponentClient({ cookies });

  const { data } = await supapase.auth.getSession();
  if (!data.session) {
    return redirect('/auth');
  }

  const { data: logs } = await supapase.from('logs').select('*').order('date', { ascending: true });

  return (
    <div className="p-5 space-y-10">
      <InitLog logs={logs as ILog[]} />
      <Navbar />
      <NewLog />
      <Calendar />
      <Logs />
    </div>
  );
}
