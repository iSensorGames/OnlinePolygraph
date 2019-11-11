import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import clsx from 'clsx';

// Components
import Typography from '../../modules/components/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// Selectors
import * as chatSelectors from '../../reducers/chat';

// Assets
import productHowItWorks1 from '../../static/img/productHowItWorks1.svg';
import productHowItWorks2 from '../../static/img/productHowItWorks2.svg';
import productHowItWorks3 from '../../static/img/productHowItWorks3.svg';

// Styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  container: {
    marginBottom: 20,
  },
  tabContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    flex: 1,
    borderBottom: '1px solid #c4c4c4',
  },
  tab: {
    alignItems: 'center',
    backgroundColor: '#b2c23d',
    flex: 1,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 10px',
    opacity: 0.3,
  },
  itemActive: {
    opacity: 1,
  },
  itemText: {
    color: 'var(--dark-gray)',
    fontSize: 12,
  },
  title: {
    color: '#48542a',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  number: {
    color: theme.palette.secondary.main,
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: 15,
  },
  image: {
    height: 55,
    marginRight: 15,
  },
});

const ChatSetupLayout = ({ children, classes, chatSetupTab }) => {
  const isIntro = chatSetupTab === 'intro';
  const isTopicSelect = chatSetupTab === 'topic';
  const isReady = chatSetupTab === 'ready';

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid
              item
              xs={6}
              md={4}
              className={clsx(classes.item, isIntro && classes.itemActive)}
            >
              <div className={classes.number}>1.</div>
              <img
                src={productHowItWorks1}
                alt="suitcase"
                className={classes.image}
              />
              <Typography
                className={classes.itemText}
                variant="h6"
                align="center"
              >
                Give a name.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              className={clsx(
                classes.item,
                isTopicSelect && classes.itemActive
              )}
            >
              <div className={classes.number}>2.</div>
              <img
                src={productHowItWorks2}
                alt="graph"
                className={classes.image}
              />
              <Typography
                className={classes.itemText}
                variant="h6"
                align="center"
              >
                Select a topic.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className={clsx(classes.item, isReady && classes.itemActive)}
            >
              <div className={classes.number}>3.</div>
              <img
                src={productHowItWorks3}
                alt="clock"
                className={classes.image}
              />
              <Typography
                className={classes.itemText}
                variant="h6"
                align="center"
              >
                Start playing.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
      {children}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    chatSetupTab: chatSelectors.getChatSetupTab(state),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(ChatSetupLayout);
