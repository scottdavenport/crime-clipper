export interface UserProfile {
  uid: string; // Firebase Auth UID
  email: string; // User's email
  displayName?: string; // Optional display name
  photoURL?: string; // URL to user's avatar in Firebase Storage
  createdAt: Date; // When the profile was created
  updatedAt: Date; // Last time the profile was updated
  preferences: {
    theme: "light" | "dark"; // User's preferred theme
    notifications: boolean; // Whether user wants notifications
    emailUpdates: boolean; // Whether user wants email updates
  };
  bio?: string; // Optional user biography
  location?: string; // Optional user location
  socialLinks?: {
    // Optional social media links
    youtube?: string;
    spotify?: string;
    twitter?: string;
  };
}

// Type for creating a new user profile (subset of fields required)
export type CreateUserProfile = Pick<UserProfile, "uid" | "email"> &
  Partial<Omit<UserProfile, "uid" | "email">>;

// Type for updating a user profile (all fields optional except uid)
export type UpdateUserProfile = Partial<Omit<UserProfile, "uid">> & {
  uid: string;
};
