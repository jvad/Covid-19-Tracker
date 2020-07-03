import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#454355",
    justifyContent: "center",
    height: "100px",
  },
  title: {
    fontSize: "2rem",
    fontFamily: "'Vast Shadow', cursive",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="body1" className={classes.title}>
            Covid-19 Tracker by Jvad
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
