import React from "react";

// Components
import { compose } from "recompose";
import Typography from "../../../modules/components/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";

// Assets
import Sinner from "../../../static/img/sinner.png";
import Saint from "../../../static/img/saint.png";
import Detector from "../../../static/img/detector.png";

// Layout
import BaseLayout from "../../../layout/Base";
import GameSetupLayout from "../../../layout/GameSetup";

// Styles
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "46.25%" // 16:9
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  roleContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20
  },
  title: {
    color: "var(--white)",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const IMAGES = {
  Sinner,
  Saint,
  Detector
};

// Mock Data
const rolesSpeaker = [
  {
    id: 1,
    outerRole: "Speaker",
    innerRole: "Sinner",
    secondaryText:
      "You must deceive (i.e.: tell a lie) while chatting with the other player.",
    body: "Guile, Deceptive, Dishonest, Evil, etc.",
    backgroundColor: "#e62958"
  },
  {
    id: 2,
    outerRole: "Speaker",
    innerRole: "Saint",
    secondaryText: "You must be truthful while chatting with the other player.",
    body: "Candor, Truthful, Honest, Good, etc.",
    backgroundColor: "#FFDE07"
  }
];

const rolesInvestigator = [
  {
    id: 3,
    outerRole: "Investigator",
    innerRole: "Detector",
    secondaryText:
      "You are given 7 (seven) minutes to make your case on whether the other player is a Saint (i.e. Honest) or a Liar (i.e.: Liar)",
    body: "Investigative and Analytical.",
    backgroundColor: "gray"
  }
];

const RoleCard = ({
  classes,
  outerRole,
  innerRole,
  title,
  secondaryText,
  body,
  backgroundColor
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {outerRole.substr(0, 1)}
          </Avatar>
        }
        title={outerRole}
        subheader={innerRole}
      />
      <CardMedia className={classes.media} image={IMAGES[innerRole]} title="" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {secondaryText}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Rules = ({ classes }) => {
  return (
    <BaseLayout>
      <Typography align="center" variant="h3" className={classes.title}>
        Rules
      </Typography>
      <GameSetupLayout isRulesRoute={false}>
        <div className={classes.container}>
          <div className={classes.roleContainer}>
            {rolesSpeaker.map(
              ({
                id,
                outerRole,
                innerRole,
                secondaryText,
                body,
                backgroundColor
              }) => (
                <RoleCard
                  key={id}
                  classes={classes}
                  outerRole={outerRole}
                  innerRole={innerRole}
                  secondaryText={secondaryText}
                  body={body}
                  backgroundColor={backgroundColor}
                />
              )
            )}
          </div>
          <div className={classes.roleContainer}>
            {rolesInvestigator.map(
              ({
                id,
                outerRole,
                innerRole,
                secondaryText,
                body,
                backgroundColor
              }) => (
                <RoleCard
                  key={id}
                  classes={classes}
                  outerRole={outerRole}
                  innerRole={innerRole}
                  secondaryText={secondaryText}
                  body={body}
                  backgroundColor={backgroundColor}
                />
              )
            )}
          </div>
        </div>
      </GameSetupLayout>
    </BaseLayout>
  );
};

export default compose(withStyles(styles))(Rules);
