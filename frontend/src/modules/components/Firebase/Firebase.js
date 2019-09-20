// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8b4FvKUqPu1JkLRR3YaFHSDggzuvcRGg",
  authDomain: "online-polygraph.firebaseapp.com",
  databaseURL: "https://online-polygraph.firebaseio.com",
  projectId: "online-polygraph",
  storageBucket: "online-polygraph.appspot.com",
  messagingSenderId: "592945055905",
  appId: "1:592945055905:web:a3e2dd9c3ef702702bc8e0"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  // ** Auth API **
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // ** User API **
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid).once("value", snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser
          };

          next(authUser);
        });
      } else {
        fallback();
      }
    });
}

export default Firebase;
