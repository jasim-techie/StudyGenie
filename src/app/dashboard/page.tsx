
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

    // If there is a user but we are still waiting for their profile from Firestore.
    // The component will re-render once userProfile is available, triggering the effect again.
    if (!userProfile) {
      return;
    }

    // Once we have the user and their profile, redirect based on role.
    if (userProfile.role === 'student') {
      router.replace('/dashboard/student');
    } else if (userProfile.role === 'parent') {
      router.replace('/dashboard/parent');
    } else {
      // Fallback for unknown roles or errors.
      console.error("Unknown user role:", userProfile.role);
      router.replace('/login');
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
