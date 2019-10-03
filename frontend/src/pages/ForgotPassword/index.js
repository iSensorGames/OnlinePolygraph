// --- Post bootstrap -----
import React from "react";
import { withDatabase } from "../../modules/components/Database";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return <ForgotPasswordFormBase />;
};

const ForgotPasswordFormBase = withDatabase(ForgotPasswordForm);

export default ForgotPasswordPage;
