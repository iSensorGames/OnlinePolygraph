import withRoot from "../../modules/withRoot";
// --- Post bootstrap -----
import React from "react";

// Components
import { compose } from "recompose";
import { withAuthorization } from "../../modules/components/Session";
import { withFirebase } from "../../modules/components/Firebase";
import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";

// Constants
import * as ROLES from "../../modules/constants/roles";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <React.Fragment>
        <AppAppBar />
        <div className="Admin">
          <div className="title">Admin</div>

          {loading && <div>loading</div>}

          <UserList users={users} />
        </div>
        <AppFooter />
      </React.Fragment>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRoot
)(AdminPage);
