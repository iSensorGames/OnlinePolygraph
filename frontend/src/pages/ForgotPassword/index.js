// --- Post bootstrap -----
import React from "react";
import { withFirebase } from "../../modules/components/Firebase";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return <ForgotPasswordFormBase />;
};

const ForgotPasswordFormBase = withFirebase(ForgotPasswordForm);

export default ForgotPasswordPage;
