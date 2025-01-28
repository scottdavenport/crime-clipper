import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { userProfileService } from "../services/userProfile";
import { UserProfile } from "../types/user";

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.email);
      setCurrentUser(user);

      try {
        if (user) {
          // Check if profile exists
          const exists = await userProfileService.profileExists(user.uid);
          console.log("Profile exists:", exists);

          if (!exists) {
            console.log("Creating new profile for:", user.email);

            // Ensure we have the required fields
            if (!user.email) {
              throw new Error("User email is required");
            }

            // Create base profile with required fields
            const profileData = {
              uid: user.uid,
              email: user.email,
              // Add optional fields if they exist
              ...(user.displayName ? { displayName: user.displayName } : {}),
              ...(user.photoURL ? { photoURL: user.photoURL } : {}),
            };

            await userProfileService.createOrLinkProfile(profileData);
          }

          // Get the user profile
          const profile = await userProfileService.getProfile(user.uid);
          console.log("Retrieved profile:", profile);
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
