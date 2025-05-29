'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useUser } from '@/lib/context';

export default function DemoPage() {
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      router.push('/');
      return;
    }

    // If already attempting to login, don't start another attempt
    if (isLoggingIn) {
      return;
    }

    const loginDemo = async () => {
      setIsLoggingIn(true);
      try {
        const response = await api.demoLogin();
        setUser(response);
        router.replace('/');  // Use replace instead of push to prevent back navigation
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoggingIn(false);
      }
    };

    loginDemo();
  }, [user, router, setUser, isLoggingIn]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-slate-600">Logging you in...</p>
      </div>
    </div>
  );
} 