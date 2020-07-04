import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cover from "./Cover.png";

const useStyles = makeStyles((theme) => ({
  image: {
    textAlign: "center",
    maxWidth: "100%",
    // height: "auto",
    // margin: "0 auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.image}>
      <img src={cover} alt="Covid Tracker By Jvad" />
    </div>
  );
};

export default Header;
