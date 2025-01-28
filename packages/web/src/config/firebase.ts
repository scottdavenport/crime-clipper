import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from "firebase/storage";

// Use minimal config for emulator
const firebaseConfig = {
  apiKey: "demo-api-key",
  projectId: "demo-crime-clipper",
  authDomain: "localhost",
  storageBucket: "demo-crime-clipper.appspot.com",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Initialize Firebase only if no apps exist
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize services
auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  // Connect to Auth emulator
  if (auth) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
  }

  // Connect to Firestore emulator
  if (db) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }

  // Connect to Storage emulator
  if (storage) {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
  }
}

export { app, auth, db, storage };
