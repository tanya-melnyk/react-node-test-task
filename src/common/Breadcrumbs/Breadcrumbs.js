import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import T from "prop-types";

import routes from "../../routes";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  typo: {
    color: "#3A80BA",
    lineHeight: 1.25
  },
  link: {
    color: "#ccc",
    lineHeight: 1.25
  }
}));

function handleClick(event) {
  // event.preventDefault();
}

export default function CustomSeparator({ userName }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" className={classes.link} />}
        aria-label="breadcrumb"
      >
        <Link className={classes.link} href={routes.HOME} onClick={handleClick}>
          Main page
        </Link>

        {userName ? (
          [
            <Link
              key="Link"
              className={classes.link}
              href={routes.USERS}
              onClick={handleClick}
            >
              User Statistics
            </Link>,
            <Typography className={classes.typo} key="Typography">
              {userName}
            </Typography>
          ]
        ) : (
          <Typography className={classes.typo}>User Statistics</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}

CustomSeparator.defaultProps = {
  userName: ""
};

CustomSeparator.propTypes = {
  userName: T.string
};
