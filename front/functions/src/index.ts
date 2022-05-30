import * as functions from "firebase-functions";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.createUser = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const password = data.password;
  const name = data.name;
  const auth = context.auth;

  if (!auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  const user = await createUserWithEmailAndPassword(admin.auth(), email, password);
  sendEmailVerification(user.user);
  updateProfile(user.user, {
    displayName: name,
  }).catch((error: any) => {
    console.log("Profile not updated: " + error);
  });

  const _doc = doc(getFirestore(), 'users', auth.uid)
  return admin
    .firestore()
    .ref("users")
    .setDoc(_doc, {
      uid: user.user.uid,
      name: name,
    })
    .then(() => {
      console.log("New User written");
      return "User created";
    })
    .catch((error: Error) => {
      throw new functions.https.HttpsError("unknown", error.message, error);
    });
});

exports.addToGroups = functions.firestore
  .document("/users/{user}")
  .onCreate((snap, context) => {
    const roles = snap.data();

    functions.logger.log("Data", context.params.user, roles);

    //    roles.add({roles: ["messages.c", "messages.r"]});
    snap.ref.set({ roles: ["messages.c", "messages.r"] }, { merge: true });
  });

exports.verifMessage = functions.firestore
  .document("/messages/{message}")
  .onCreate((snap, context) => {
    const original = snap.data().original;

    functions.logger.log(
      "Data",
      context.params.user,
      original,
      snap.data(),
      snap.id
    );
  });


function getFirestore(): any {
    throw new Error("Function not implemented.");
}
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
