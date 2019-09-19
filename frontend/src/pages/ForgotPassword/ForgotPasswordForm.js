import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Component
import { Field, Form } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../modules/components/Typography";
import AppFooter from "../../modules/views/AppFooter";
import AppAppBar from "../../modules/views/AppAppBar";
import AppForm from "../../modules/views/AppForm";
import { email, required } from "../../modules/form/validation";
import RFTextField from "../../modules/form/RFTextField";
import FormButton from "../../modules/form/FormButton";
import FormFeedback from "../../modules/form/FormFeedback";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
}));

const ForgotPassword = ({ firebase }) => {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const validate = values => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const onSubmit = async values => {
    const { email } = values;
    await sleep(300);
    setSent(true);

    await firebase
      .doPasswordReset(email)
      .then(() => {
        setSubmitError(null);
        setSent(false);
      })
      .catch(error => {
        setSubmitError(error.message);
        setSent(false);
      });

    return;
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              "send you a link to reset your password."}
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => {
            return (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoFocus
                  autoComplete="email"
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                {submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null}
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "In progress…" : "Send reset link"}
                </FormButton>
              </form>
            );
          }}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(ForgotPassword);
