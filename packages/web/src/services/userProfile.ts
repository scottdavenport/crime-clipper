import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  UserProfile,
  CreateUserProfile,
  UpdateUserProfile,
} from "../types/user";

const COLLECTION_NAME = "userProfiles";

export const userProfileService = {
  /**
   * Create a new user profile or link to existing profile by email
   */
  async createOrLinkProfile(data: CreateUserProfile): Promise<void> {
    // First check if a profile with this email already exists
    const existingProfile = await this.getProfileByEmail(data.email);

    if (existingProfile) {
      // If profile exists with this email, update it with the new UID
      const docRef = doc(db, COLLECTION_NAME, existingProfile.uid);
      await updateDoc(docRef, {
        linkedUids: [...(existingProfile.linkedUids || []), data.uid],
        updatedAt: new Date(),
      });

      // Also create a reference document for the new UID
      const newDocRef = doc(db, COLLECTION_NAME, data.uid);
      await setDoc(newDocRef, {
        ...existingProfile,
        uid: data.uid,
        linkedUids: [...(existingProfile.linkedUids || []), data.uid],
        updatedAt: new Date(),
      });
    } else {
      // Create new profile if none exists
      const now = new Date();
      const defaultPreferences = {
        theme: "light" as const,
        notifications: true,
        emailUpdates: true,
      };

      const profile: UserProfile = {
        ...data,
        createdAt: now,
        updatedAt: now,
        preferences: defaultPreferences,
        linkedUids: [data.uid],
      };

      const docRef = doc(db, COLLECTION_NAME, data.uid);
      await setDoc(docRef, profile);
    }
  },

  /**
   * Get a user profile by UID
   */
  async getProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }

    return null;
  },

  /**
   * Update a user profile and all linked profiles
   */
  async updateProfile(data: UpdateUserProfile): Promise<void> {
    const { uid, ...updateData } = data;

    // Get the current profile to get linkedUids
    const currentProfile = await this.getProfile(uid);
    if (!currentProfile) return;

    const linkedUids = currentProfile.linkedUids || [uid];

    // Update all linked profiles
    for (const linkedUid of linkedUids) {
      const docRef = doc(db, COLLECTION_NAME, linkedUid);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date(),
      });
    }
  },

  /**
   * Get a user profile by email
   */
  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as UserProfile;
    }

    return null;
  },

  /**
   * Check if a profile exists
   */
  async profileExists(uid: string): Promise<boolean> {
    const docRef = doc(db, COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  },
};
