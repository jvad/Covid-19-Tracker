import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Cards from "./Cards";
import Tab from "@material-ui/core/Tab";
import Country from "./Country";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "red",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
}));

const TabBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className={classes.container}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Global" />
          <Tab label="Country" />
        </Tabs>
      </div>
      {value === 0 && <Cards />}
      {value === 1 && <Country />}
    </div>
  );
};

export default TabBar;
