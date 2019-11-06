import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

// Selectors
import * as sessionSelectors from "../../reducers/session";

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

const SignIn = ({
  history,
  classes,
  user,
  isFetching,
  errorMessage,
  signIn
}) => {
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

  const onSubmit = async values => {
    const { email, password } = values;
    await signIn(email, password);
  };

  // Redirect if user exists
  if (!!user) {
    history.push(ROUTES.SCOREBOARD);
  }

  if (isFetching) {
    return null;
  }

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
                autoFocus={!isFetching}
                component={RFTextField}
                disabled={submitting || isFetching}
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
                disabled={submitting || isFetching}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              {errorMessage ? (
                <FormFeedback className={classes.feedback} error>
                  {errorMessage}
                </FormFeedback>
              ) : null}
              <FormButton
                className={classes.button}
                disabled={submitting || isFetching}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || isFetching ? "In progress…" : "Sign In"}
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
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: sessionSelectors.getUser(state),
    isFetching: sessionSelectors.getIsFetching(state),
    errorMessage: sessionSelectors.getErrorMessage(state)
  };
};

const actionCreators = {
  signIn: sessionActions.signIn
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(SignIn);
