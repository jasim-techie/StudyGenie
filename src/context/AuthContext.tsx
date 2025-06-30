
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import type { StudentProfile } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';
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

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setLoading(false); // Auth check is complete
      setUser(authUser);

      if (unsubscribeProfile) unsubscribeProfile();

      if (authUser) {
        setProfileLoading(true); // Start loading profile
        const userDocRef = doc(db, 'students', authUser.uid);
        
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as StudentProfile);
          } else {
             // This case is handled in the UI. It can happen briefly during signup.
             setUserProfile(null);
          }
          setProfileLoading(false); // Profile fetch attempt is complete
        }, (error) => {
          console.error("Error listening to student profile:", error);
          setUserProfile(null);
          setProfileLoading(false);
        });
      } else {
        // User is logged out
        setUserProfile(null);
        setProfileLoading(false); // No profile to load
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
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
