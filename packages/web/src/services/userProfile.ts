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
   * Create a new user profile
   */
  async createProfile(data: CreateUserProfile): Promise<void> {
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
    };

    const docRef = doc(db, COLLECTION_NAME, data.uid);
    await setDoc(docRef, profile);
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
   * Update a user profile
   */
  async updateProfile(data: UpdateUserProfile): Promise<void> {
    const { uid, ...updateData } = data;
    const docRef = doc(db, COLLECTION_NAME, uid);

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
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
