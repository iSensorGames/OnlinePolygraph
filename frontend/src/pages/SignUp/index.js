import React from "react";
import { withRouter } from "react-router";
import { withFirebase } from "../../modules/components/Firebase";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return <SignUpFormBase />;
};

const SignUpFormBase = withRouter(withFirebase(SignUpForm));

export default SignUpPage;
