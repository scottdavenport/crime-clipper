"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.helloWorld = functions.https.onCall((data, context) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    return { message: "Hello from Crime Clipper!" };
});
//# sourceMappingURL=index.js.map