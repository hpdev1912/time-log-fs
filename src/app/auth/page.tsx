import React from 'react';
import AuthComponent from '../components/AuthComponent';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';

export default async function AuthPage() {
  const supapase = createServerComponentClient({ cookies });

  const { data } = await supapase.auth.getSession();
  if (data.session) {
    return redirect('/');
  }
  return <AuthComponent />;
}
