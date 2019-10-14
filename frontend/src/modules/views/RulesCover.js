import React from "react";
import PropTypes from "prop-types";

// Components
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import RulesLayout from "./RulesLayout";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  background: {
    backgroundColor: "#43CEEB", // Average color of the background image.
    backgroundPosition: "center"
  },
  slogan: {
    fontWeight: "bold",
    fontSize: 25
  },
  title: {
    backgroundColor: "#e62958",
    color: "var(--white)",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8
  },
  more: {
    marginTop: theme.spacing(2)
  },
  cardTitle: {
    fontSize: 14
  },
  card: {
    marginTop: 15,
    minWidth: 275,
    maxWidth: 400
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

const rolesData = [
  {
    outerRole: "Speaker",
    innerRole: "Sinner",
    title: "Liar",
    secondaryText:
      "You must deceive (i.e.: tell a lie) while chatting with the other player.",
    body: "Guile, Deceptive, Dishonest, Evil, etc.",
    backgroundColor: "#e62958"
  },
  {
    outerRole: "Speaker",
    innerRole: "Saint",
    title: "Truth-teller",
    secondaryText: "You must be truthful while chatting with the other player.",
    body: "Candor, Truthful, Honest, Good, etc.",
    backgroundColor: "#FFDE07"
  },
  {
    outerRole: "Detector",
    innerRole: "",
    title: "Liar",
    secondaryText:
      "You are given 7 (seven) minutes to make your case on whether the other player is a Saint (i.e. Honest) or a Liar (i.e.: Liar)",
    body: "Investigative and Analytical.",
    backgroundColor: "gray"
  }
];

/**
 * @description Display all roles
 * @param {MaterialUI styles object} classes
 */
const Roles = ({
  classes,
  outerRole,
  innerRole,
  title,
  secondaryText,
  body,
  backgroundColor
}) => {
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card} style={{ backgroundColor }}>
      <CardContent>
        <Typography
          className={classes.cardTitle}
          color="textSecondary"
          gutterBottom
        >
          {outerRole} {bull} {innerRole}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {secondaryText}
        </Typography>
        <Typography variant="body2" component="p">
          This role entails on the player portraying the following
          characteristics:
          <br />
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

function RulesCover(props) {
  const { classes } = props;

  return (
    <RulesLayout backgroundClassName={classes.background}>
      <Typography align="center" variant="h3" className={classes.title}>
        Rules
      </Typography>

      {rolesData.map(
        ({
          outerRole,
          innerRole,
          title,
          secondaryText,
          body,
          backgroundColor
        }) => (
          <Roles
            classes={classes}
            outerRole={outerRole}
            innerRole={innerRole}
            title={title}
            secondaryText={secondaryText}
            body={body}
            backgroundColor={backgroundColor}
          />
        )
      )}
    </RulesLayout>
  );
}

RulesCover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RulesCover);
