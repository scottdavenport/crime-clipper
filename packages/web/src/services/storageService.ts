import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";

export const storageService = {
  /**
   * Upload a file to Firebase Storage
   * @param file The file to upload
   * @param path The path in storage where the file should be saved
   * @returns The download URL of the uploaded file
   */
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  },

  /**
   * Delete a file from Firebase Storage
   * @param path The path of the file to delete
   */
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },

  /**
   * Upload an avatar image
   * @param file The image file to upload
   * @param uid The user's UID
   * @returns The download URL of the uploaded avatar
   */
  async uploadAvatar(file: File, uid: string): Promise<string> {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }

    // Generate a unique filename with timestamp
    const extension = file.name.split(".").pop();
    const filename = `avatar-${Date.now()}.${extension}`;
    const path = `avatars/${uid}/${filename}`;

    // Delete existing avatar if it exists
    try {
      const oldPath = `avatars/${uid}`;
      await this.deleteFile(oldPath);
    } catch (error) {
      // Ignore error if no existing avatar
    }

    // Upload new avatar
    return this.uploadFile(file, path);
  },
};
