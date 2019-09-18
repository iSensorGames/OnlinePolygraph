// --- Post bootstrap -----
import React from "react";
import { withRouter } from "react-router";
import { withFirebase } from "../../Firebase";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return <SignIpForm />;
};

const SignIpForm = withRouter(withFirebase(SignInForm));

export default SignInPage;
