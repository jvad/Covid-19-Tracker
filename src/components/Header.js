import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cover from "./Cover.png";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    textAlign: "center",
    // maxWidth: "100%",
    // height: "auto",
    // margin: "0 auto",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    minWidth: "200px",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.imgContainer}>
      <img src={cover} alt="Covid Tracker By Jvad " className={classes.image} />
    </div>
  );
};

export default Header;
