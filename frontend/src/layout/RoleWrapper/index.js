import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as utils from '../../utils';

// Selectors
import * as chatSelectors from '../../reducers/chat';

// Actions
import * as chatActions from '../../actions/chat';

// Constants
import * as ROLES from '../../modules/constants/roles';

// Styles
import { withStyles } from '@material-ui/core/styles';
const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },
  topMenuContainer: {
    alignItems: 'center',
    backgroundColor: '#123791',
    display: 'flex',
    flexDirection: 'row',
    left: 0,
    justifyContent: 'space-around',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  gameItemContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 80,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  value: {
    marginTop: 10,
  },
});

const RoleWrapperLayout = ({ children, classes, game }) => {
  let [time, setTime] = useState(300000);
  // let interval = null;
  // useEffect(() => {
  //   interval = setInterval(() => {
  //     setTime(time - 1000);

  //     if (time <= 1000) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  const { gameRound, outerRole, innerRole } = game;

  return (
    <div className={classes.container}>
      <div className={classes.topMenuContainer}>
        <div className={classes.gameItemContainer}>
          <div className={classes.title}>Outer Role</div>
          <div className={classes.value}>
            {ROLES.OUTER_ROLE[outerRole].NAME}
          </div>
        </div>
        <div className={classes.gameItemContainer}>
          <div className={classes.title}>Inner Role</div>
          <div className={classes.value}>
            {ROLES.INNER_ROLE[innerRole].NAME}
          </div>
        </div>
        <div className={classes.gameItemContainer}>
          <div className={classes.title}>Game Round</div>
          <div className={classes.value}>{`${gameRound} of 12`}</div>
        </div>
        <div className={classes.gameItemContainer}>
          <div className={classes.title}>Time left</div>
          <div className={classes.value}>
            {utils.millisecondsToMinutesSeconds(time)}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    game: chatSelectors.getGame(state),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(RoleWrapperLayout);
