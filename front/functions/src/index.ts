import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.addToGroups = functions.firestore
  .document("/users/{user}")
  .onCreate((snap, context) => {
    const original = snap.data().original;

    functions.logger.log("Data", context.params.user, original);
  });

  exports.verifMessage = functions.firestore
  .document("/messages/{message}")
  .onCreate((snap, context) => {
    const original = snap.data().original;

    functions.logger.log("Data", context.params.user, original, snap.data(), snap.id);
  });

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
