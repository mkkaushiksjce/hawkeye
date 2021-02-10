import React, { useState, forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";

// Material UI Components
import { List, ListItem, Collapse, Button, Drawer } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

//classnames alternative modules
import clsx from "clsx";

import useStyles from "./menuBarStyles";
// Menu data import
import MenuData from "./menuData.js";

const MenuBar = props => {
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = useStyles();
  const handleClick = item => {
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));
  const handleMenu = (children, level = 0) => {
    return children.map(({ children, name, url, links }) => {
      if (!children) {
        return (
          <List component="div" disablePadding key={name}>
            <ListItem
              className={classes.item}
              disableGutters
              style={{ padding: "0px" }}
              key={name}
            >
              <Button
                className={clsx({
                  [classes.btnRoot]: true,
                  [classes.button]: true,
                  [classes.subMenu]: level
                })}
                component={CustomRouterLink}
                to={url}
              >
                {name}
              </Button>
            </ListItem>
          </List>
        );
      }
      return (
        <div key={name}>
          <ListItem
            className={classes.item}
            disableGutters
            key={name}
            onClick={() => handleClick(name)}
          >
            <Button
              className={clsx({
                [classes.btnRoot]: true,
                [classes.button]: true,
                [classes.subMenu]: level
              })}
            >
              {name} {menu[name] ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </ListItem>
          <Collapse in={menu[name] ? true : false} timeout="auto" unmountOnExit>
            {handleMenu(children, 1)}
          </Collapse>
        </div>
      );
    });
  };
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      open={true}
      variant="persistent"
    >
      <List {...rest} className={clsx(classes.root, className)}>
        {handleMenu(MenuData)}
      </List>
    </Drawer>
  );
};
export default MenuBar;
