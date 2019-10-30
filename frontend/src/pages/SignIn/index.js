import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router";

// Actions
import * as sessionActions from "../../actions/session";

// Constants
import * as ROUTES from "../../modules/constants/routes";

// Layout
import BaseLayout from "../../layout/Base";

// Components
import { Field, Form } from "react-final-form";
import Link from "@material-ui/core/Link";
import Typography from "../../modules/components/Typography";
import AppFooter from "../../modules/views/AppFooter";
import AppForm from "../../modules/views/AppForm";
import { email, required } from "../../modules/form/validation";
import RFTextField from "../../modules/form/RFTextField";
import FormButton from "../../modules/form/FormButton";
import FormFeedback from "../../modules/form/FormFeedback";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
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
});

const SignIn = ({ history, classes, signIn }) => {
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const validate = values => {
    const errors = required(["email", "password"], values);

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
    const { email, password } = values;
    await sleep(300);
    setSent(true);

    await signIn(email, password)
      .then(data => {
        console.log("before error data", data);
        if ("error" in data) {
          setSubmitError(data.message);
          setSent(false);
        }

        console.log("history push time");
        history.push(ROUTES.WELCOME_ROUTE);
        console.log("history after push");
      })
      .catch(error => {
        setSubmitError(error);
        setSent(false);
      });
  };

  return (
    <BaseLayout>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href={ROUTES.SIGN_UP} align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={values => onSubmit(values)}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus={!sent}
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
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
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </form>
          )}
        </Form>

        <Typography align="center">
          <Link underline="always" href={ROUTES.FORGOT_PASSWORD}>
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </BaseLayout>
  );
};

const actionCreators = {
  signIn: sessionActions.signIn
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    actionCreators
  )
)(SignIn);
