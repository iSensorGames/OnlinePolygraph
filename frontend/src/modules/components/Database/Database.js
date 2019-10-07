import * as auth from "./auth";

class Database {
  // ** Auth API **
  doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => auth.signOut();
  doPasswordReset = email => auth.passwordReset(email);
  doPasswordUpdate = password => auth.passwordUpdate(password);
  onAuthUserListener = async JWT_VARIABLE =>
    auth.onAuthUserListener(JWT_VARIABLE);
  currentUser = () => () => {};
}

export default Database;
