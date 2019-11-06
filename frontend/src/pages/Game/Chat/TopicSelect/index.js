import React from "react";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center"
  }
});

const TopicSelect = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Button color="primary" onClick={() => createRoom()}>
        Select Topic
      </Button>
    </div>
  );
};

export default withStyles(styles)(TopicSelect);
