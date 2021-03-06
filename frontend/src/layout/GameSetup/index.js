import React from "react";
import clsx from "clsx";

// Components
import Button from "../../modules/components/Button";

// Constants
import * as ROUTES from "../../modules/constants/routes";

// Icons
import AssessmentIcon from "@material-ui/icons/Assessment";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  button: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    minWidth: 200,
    width: "100%"
  },
  buttonTxt: {
    marginLeft: 10
  },
  actionButton: {
    backgroundColor: "#FFDE07"
  },
  actionButtonSecondary: {
    backgroundColor: "var(--blue)"
  },
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    width: "100%"
  }
});

const GameSetupLayout = ({
  children,
  classes,
  isRulesRoute,
  isStartScreen
}) => {
  return (
    <React.Fragment>
      {children}
      <div className={classes.container}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          href={isRulesRoute ? ROUTES.RULES : ROUTES.SCOREBOARD}
        >
          <AssessmentIcon />
          <div className={classes.buttonTxt}>
            {isRulesRoute ? "Rules" : "Scoreboard"}
          </div>
        </Button>
        {isStartScreen ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={clsx(classes.button, classes.actionButtonSecondary)}
            component="a"
            href={ROUTES.SCOREBOARD}
          >
            <PlayArrowIcon />
            <div className={classes.buttonTxt}>Scoreboard</div>
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={clsx(classes.button, classes.actionButton)}
            component="a"
            href={ROUTES.CHAT}
          >
            <PlayArrowIcon />
            <div className={classes.buttonTxt}>Start</div>
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

GameSetupLayout.defaultProps = {
  isRulesRoute: true,
  isStartScreen: false
};

export default withStyles(styles)(GameSetupLayout);
