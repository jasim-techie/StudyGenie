
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import type { StudentProfile } from '@/lib/types';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AuthContextType {
  user: User | null;
  userProfile: StudentProfile | null;
  loading: boolean; // Represents ONLY the initial auth check
  profileLoading: boolean; // Represents the loading state of the Firestore profile
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true, profileLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true); // Tracks initial onAuthStateChanged
  const [profileLoading, setProfileLoading] = useState(true); // Tracks Firestore profile fetch

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setLoading(false);
      setProfileLoading(false);
      return;
    }

    let unsubscribeProfile: (() => void) | undefined;
    let profileTimeout: NodeJS.Timeout | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
      setUser(authUser);

      // Clean up previous listeners and timeouts
      if (unsubscribeProfile) unsubscribeProfile();
      if (profileTimeout) clearTimeout(profileTimeout);

      if (authUser) {
        setProfileLoading(true);
        const userDocRef = doc(db, 'students', authUser.uid);

        // For new users, their profile might not exist immediately after auth creation.
        // We give it a grace period to avoid a race condition.
        const isNewUser = authUser.metadata.creationTime === authUser.metadata.lastSignInTime;
        
        if (isNewUser) {
            profileTimeout = setTimeout(() => {
                console.error(`Timeout: Profile for new user ${authUser.uid} not found after 5s.`);
                setProfileLoading(false); // Give up and show an error if it takes too long
            }, 5000);
        }

        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            if (profileTimeout) clearTimeout(profileTimeout); // Profile found, cancel timeout
            setUserProfile(docSnap.data() as StudentProfile);
            setProfileLoading(false); // We are done loading
          } else {
             // If it's an existing user, this is an immediate error.
             if (!isNewUser) {
                console.warn(`Profile for existing user ${authUser.uid} not found.`);
                setUserProfile(null);
                setProfileLoading(false);
             }
             // If it IS a new user, we don't do anything here. We let the onSnapshot
             // listener fire again when the doc is created, or let the timeout handle failure.
          }
        }, (error) => {
          console.error("Error listening to student profile:", error);
          if (profileTimeout) clearTimeout(profileTimeout);
          setUserProfile(null);
          setProfileLoading(false);
        });
      } else {
        // User is logged out
        setUserProfile(null);
        setProfileLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      if (profileTimeout) clearTimeout(profileTimeout);
    };
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
    <AuthContext.Provider value={{ user, userProfile, loading, profileLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
