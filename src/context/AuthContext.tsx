
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean; // This now represents ONLY the initial auth check
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Is the initial auth state check running?

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false); // Stop loading if Firebase isn't set up
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); // Set the Firebase user object immediately
      if (user && db) {
        // If user is logged in, fetch their profile.
        // The profile fetching is now independent of the main `loading` state.
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          // This can happen if the user doc creation failed after signup
          console.error("User exists in Auth, but no profile found in Firestore.");
          setUserProfile(null);
        }
      } else {
        // If user is logged out, clear the profile.
        setUserProfile(null);
      }
      setLoading(false); // The initial auth check is complete.
    });

    return () => unsubscribe();
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Firebase Not Configured</AlertTitle>
          <AlertDescription>
            Your Firebase environment variables are missing or incomplete. Please create a 
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.env.local</code>
            file in your project's root directory and add your Firebase credentials.
            You can copy the format from the <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.env</code> file. The app will not work correctly until this is configured.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // The AuthProvider no longer renders a global loading screen.
  // The consumer pages (dashboards) will handle their own loading states.
  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
