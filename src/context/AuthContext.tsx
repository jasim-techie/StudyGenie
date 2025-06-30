
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean; // Represents the initial auth check AND profile fetch
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setLoading(false);
      return;
    }

    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      // Clean up the old profile listener if the user changes
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }

      if (authUser) {
        setUser(authUser);
        // Set up a new listener for the logged-in user's profile
        const userDocRef = doc(db, 'users', authUser.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // This is the case from the error report. It's a valid state (e.g., interrupted signup).
            // We'll log a warning instead of an error.
            console.warn("User profile not found in Firestore for UID:", authUser.uid);
            setUserProfile(null);
          }
          setLoading(false); // Stop loading once we have auth and profile status.
        }, (error) => {
          console.error("Error listening to user profile:", error);
          setUserProfile(null);
          setLoading(false);
        });
      } else {
        // User is logged out
        setUser(null);
        setUserProfile(null);
        setLoading(false); // Stop loading
      }
    });

    // Cleanup both listeners on component unmount
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
    // The empty dependency array ensures this effect runs only once on mount.
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
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
