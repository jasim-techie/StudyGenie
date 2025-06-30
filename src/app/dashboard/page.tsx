'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial authentication check is complete.
    if (loading) {
      return;
    }

    // If auth check is done and there's no user, redirect to login.
    if (!user) {
      router.replace('/login');
      return;
    }

    // Since it's a student-only app now, always redirect to the student dashboard.
    // We check for userProfile to ensure the data is loaded before redirecting.
    if (userProfile) {
      router.replace('/dashboard/student');
    }
    
  }, [user, userProfile, loading, router]);

  // This is the loading screen shown while the logic in useEffect is running.
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg font-medium text-foreground">Loading Dashboard...</p>
    </div>
  );
}
