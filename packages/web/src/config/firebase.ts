import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from "firebase/firestore";

// Use minimal config for emulator
const firebaseConfig = {
  apiKey: "demo-api-key",
  projectId: "demo-crime-clipper",
  authDomain: "localhost",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase only if no apps exist
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize services
auth = getAuth(app);
db = getFirestore(app);

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
}

export { app, auth, db };
