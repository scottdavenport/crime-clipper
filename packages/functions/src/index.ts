import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.https.onCall((data, context) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  return { message: "Hello from Crime Clipper!" };
});
