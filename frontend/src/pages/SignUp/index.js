import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

// Selectors
import * as sessionSelectors from '../../reducers/session';

// Actions
import * as sessionActions from '../../actions/session';

// Constants
import * as ROUTES from '../../modules/constants/routes';
import * as ROLES from '../../modules/constants/roles';

// Layout
import BaseLayout from '../../layout/Base';

// Components
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form } from 'react-final-form';
import Typography from '../../modules/components/Typography';
import AppForm from '../../modules/views/AppForm';
import { email, required } from '../../modules/form/validation';
import RFTextField from '../../modules/form/RFTextField';
import FormButton from '../../modules/form/FormButton';
import FormFeedback from '../../modules/form/FormFeedback';

// Styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
});

const SignUp = ({
  history,
  classes,
  isFetching,
  user,
  errorMessage,
  signUp,
}) => {
  const validate = values => {
    const errors = required(
      ['firstName', 'lastName', 'email', 'password'],
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

  const onSubmit = async values => {
    const { email, password, firstName, lastName } = values;
    await signUp({
      email,
      password,
      firstName,
      lastName,
      roles: 2,
    });
  };

  if (!!user) {
    history.push(ROUTES.SCOREBOARD_ROUTE);
  }

  if (isFetching) {
    return null;
  }

  return (
    <BaseLayout>
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
        <Form
          onSubmit={values => onSubmit(values)}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                disabled={submitting || isFetching}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
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
                color="secondary"
                fullWidth
              >
                {submitting || isFetching ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </BaseLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: sessionSelectors.getUser(state),
    isFetching: sessionSelectors.getIsFetching(state),
    errorMessage: sessionSelectors.getErrorMessage(state),
  };
};

const actionCreators = {
  signUp: sessionActions.signUp,
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    actionCreators
  )
)(SignUp);
