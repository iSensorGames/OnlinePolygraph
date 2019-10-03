import React from "react";
import { withRouter } from "react-router";
import { withDatabase } from "../../modules/components/Database";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return <SignUpFormBase />;
};

const SignUpFormBase = withRouter(withDatabase(SignUpForm));

export default SignUpPage;
