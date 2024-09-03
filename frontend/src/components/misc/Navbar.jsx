import React from "react";
import classes from "./Navbar.module.css";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import Logo from "../../assets/Logo"
import { useNavigate } from "react-router-dom";

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const navbarClass = isHomePage ? `${classes.header} ${classes.noMarginB}` : `${classes.header}`;

  return (
    <header className={navbarClass}>
      <Container size="md" className={classes.inner}>
        <Logo onClick={()=>{navigate("/")}} style={{cursor:"pointer"}}/>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
