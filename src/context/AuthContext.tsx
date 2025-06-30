
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
  loading: boolean; // Represents ONLY the initial auth check from Firebase Auth
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Is the initial onAuthStateChanged listener running?

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setLoading(false); 
      return;
    }

    // Listener for Firebase Auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        // User is signed out
        setUserProfile(null);
        setLoading(false); // Auth check is complete
      }
      // If authUser exists, the profile listener below will handle setting the profile.
      // We set loading to false here because we now know the user's auth status.
      setLoading(false);
    });

    let unsubscribeProfile: (() => void) | undefined;

    if (user && db) {
        // Listener for Firestore profile changes for the logged-in user
        const userDocRef = doc(db, 'users', user.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserProfile(docSnap.data() as UserProfile);
            } else {
                console.error("User profile not found in Firestore for UID:", user.uid);
                setUserProfile(null);
            }
        }, (error) => {
            console.error("Error listening to user profile:", error);
            setUserProfile(null);
        });
    }

    // Cleanup both listeners on component unmount
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, [user]); // Re-run effect if the user object changes (login/logout)


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
