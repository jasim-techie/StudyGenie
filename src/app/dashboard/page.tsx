
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // Still waiting for the initial auth state check.
      return;
    }

    if (!user) {
      // If auth check is done and there's no user, they are not logged in.
      router.replace('/login');
      return;
    }

    if (userProfile) {
      // If we have a user and their profile, we can redirect.
      if (userProfile.role === 'student') {
        router.replace('/dashboard/student');
      } else if (userProfile.role === 'parent') {
        router.replace('/dashboard/parent');
      } else {
        // Fallback for unexpected roles, though this shouldn't happen.
        console.error("Unknown user role:", userProfile.role);
        router.replace('/login');
      }
    }
    // If `user` exists but `userProfile` is still null, it means the profile is still being fetched.
    // The component will re-render once `userProfile` is updated in the context,
    // and this useEffect will run again.
  }, [user, userProfile, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg font-medium text-foreground">Please wait...</p>
    </div>
  );
}
