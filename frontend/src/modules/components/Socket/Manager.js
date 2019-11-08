import React from 'react';
import { connect } from 'react-redux';

// Selectors
import * as socketSelectors from '../../../reducers/socket';

// Actions
import * as socketActions from '../../../actions/socket';

class Manager extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.openConnection();
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

const actionCreators = {
  openConnection: socketActions.openConnection,
};

export default connect(
  null,
  actionCreators
)(Manager);
