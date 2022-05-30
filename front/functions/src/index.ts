import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.createUser = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const password = data.password;
  const name = data.name;

  const user = await admin.auth().createUser({
    email: email,
    password: password,
    displayName: name,
  });
  //  const user = await createUserWithEmailAndPassword(admin.auth(), email, password);
  admin.auth().sendEmailVerification(user.user);

  functions.logger.log("User", user);

  return admin
    .firestore()
    .doc("users/" + user.user.uid)
    .set({
      uid: user.user.uid,
      name: name,
      email: email,
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
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
