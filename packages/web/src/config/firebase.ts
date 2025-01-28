import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Initialize Firebase with demo config for emulator
const app = initializeApp({
  projectId: "demo-crime-clipper",
  apiKey: "demo-api-key",
});

// Initialize Firebase services
export const auth = getAuth(app);
export const functions = getFunctions(app);

// Connect to emulators
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export default app;
