import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import * as ROUTES from "../../modules/constants/routes";

// Constants
import * as authConstants from "../../modules/constants/auth";

// Components
import { Field, Form } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "../../modules/components/Typography";
import AppFooter from "../../modules/views/AppFooter";
import AppAppBar from "../../modules/views/AppAppBar";
import AppForm from "../../modules/views/AppForm";
import { email, required } from "../../modules/form/validation";
import RFTextField from "../../modules/form/RFTextField";
import FormButton from "../../modules/form/FormButton";
import FormFeedback from "../../modules/form/FormFeedback";
import { AuthUserContext } from "../../modules/components/Session";

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

const SignInForm = ({ database, history }) => {
  const classes = useStyles();
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
  const onSubmit = async (values, setAuthUser) => {
    const { email, password } = values;
    await sleep(300);
    setSent(true);

    await database
      .doSignInWithEmailAndPassword(email, password)
      .then(async ({ data }) => {
        await setAuthUser(data.user);
        localStorage.setItem(authConstants.KEY, JSON.stringify({ ...data }));
        history.push(ROUTES.GAME);
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
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href={ROUTES.SIGN_UP} align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <AuthUserContext.Consumer>
          {({ setAuthUser }) => (
            <Form
              onSubmit={values => onSubmit(values, setAuthUser)}
              subscription={{ submitting: true }}
              validate={validate}
            >
              {({ handleSubmit, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
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
          )}
        </AuthUserContext.Consumer>
        <Typography align="center">
          <Link underline="always" href={ROUTES.FORGOT_PASSWORD}>
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(SignInForm);
