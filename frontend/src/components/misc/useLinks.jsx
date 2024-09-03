import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";

export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  const items = !user
    ? [
        { path: "/", label: "Home" },
        { path: "/login", label: "Login" }
      ].map((link, index) => (
        <NavLink key={index} onClick={handleClick} className={classes.link} end to={link.path}>
          {link.label}
        </NavLink>
      ))
    : [
        { path: "/posts", label: "Posts" },
        { path: "/posts/create", label: "Create" },
        { path: "/", label: "Logout", action: logoutService }
      ].map((link, index) => (
        <NavLink key={index} onClick={() => handleClick(link.action)} className={classes.link} end to={link.path}>
          {link.label}
        </NavLink>
      ));

  return [items];
};
