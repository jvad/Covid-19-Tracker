import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
    root: {
        
      width: "350px",
      height: "auto",
      margin: "20px auto"
    },
    bar: {
        width: "30px",
        margin: "40px auto"
    }
    
    }));

const Country = () => {
    const classes = useStyles();
  return (
    <>
     <div className={classes.bar}> <CircularProgress  /> </div>
      <h3 className={classes.root}> Currently Working On this Tab.. Stay tuned.. . </h3>
    </>
  );
};

export default Country;
