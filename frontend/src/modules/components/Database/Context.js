import React from "react";

const DatabaseContext = React.createContext(null);

export const withDatabase = Component => props => (
  <DatabaseContext.Consumer>
    {database => <Component {...props} database={database} />}
  </DatabaseContext.Consumer>
);

export default DatabaseContext;
