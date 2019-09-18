// --- Post bootstrap -----
import React from "react";
import { withRouter } from "react-router";
import { withFirebase } from "../../Firebase";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return <SignInFormBase />;
};

const SignInFormBase = withRouter(withFirebase(SignInForm));

export default SignInPage;
