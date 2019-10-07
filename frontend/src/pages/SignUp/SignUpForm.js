import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import * as ROUTES from "../../modules/constants/routes";
import * as ROLES from "../../modules/constants/roles";

// Constants
import * as authConstants from "../../modules/constants/auth";

// Components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form } from "react-final-form";
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

const SignUp = ({ database, history }) => {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const validate = values => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

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
    const { email, password, firstName, lastName, isAdmin } = values;
    const roles = ROLES.USER;

    if (isAdmin) {
      roles = ROLES.ADMIN;
    }

    await sleep(300);
    setSent(true);

    const user = {
      email,
      password,
      firstName,
      lastName,
      roles
    };

    await database
      .doCreateUserWithEmailAndPassword(user)
      .then(async result => {
        const { data } = result;

        await setAuthUser(user);
        localStorage.setItem(authConstants.KEY, JSON.stringify({ ...data }));
        history.push(ROUTES.WELCOME);
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
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in/" underline="always">
              Already have an account?
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        autoFocus
                        component={RFTextField}
                        autoComplete="fname"
                        fullWidth
                        label="First name"
                        name="firstName"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={RFTextField}
                        autoComplete="lname"
                        fullWidth
                        label="Last name"
                        name="lastName"
                        required
                      />
                    </Grid>
                  </Grid>
                  <Field
                    autoComplete="email"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    required
                  />
                  <Field
                    fullWidth
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
                    color="secondary"
                    fullWidth
                  >
                    {submitting || sent ? "In progress…" : "Sign Up"}
                  </FormButton>
                </form>
              )}
            </Form>
          )}
        </AuthUserContext.Consumer>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(SignUp);
