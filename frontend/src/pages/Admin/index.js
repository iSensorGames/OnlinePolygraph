import React from "react";

// Components
import { compose } from "recompose";
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

export default AdminPage;
