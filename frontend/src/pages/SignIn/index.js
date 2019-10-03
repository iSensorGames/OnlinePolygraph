// --- Post bootstrap -----
import React from "react";
import { withRouter } from "react-router";
import { withDatabase } from "../../modules/components/Database";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return <SignInFormBase />;
};

const SignInFormBase = withRouter(withDatabase(SignInForm));

export default SignInPage;
