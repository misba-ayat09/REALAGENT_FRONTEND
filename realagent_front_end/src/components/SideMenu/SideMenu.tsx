import React from "react";
import { Button, Group, Paper, Text } from "@mantine/core";
import classes from "./SideMenu.module.css";
import { IconType } from '../common/Icons';
import MenuItem from "./MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { IconSettings2, IconHelp } from "@tabler/icons-react";

interface SideMenuParams {}

export const SideMenu: React.FC<SideMenuParams> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Group className={classes.sideMenu}>
      <Paper className={classes.buttonWrapper}>
        <Button className={classes.mainButton}></Button>
      </Paper>
      <Paper className={classes.discoverWrapper}>
        <Text ml={8} className={classes.title}>
          Discover
        </Text>
        <Paper className={classes.menuItemsWrapper}>
          <MenuItem
            icon={
              location.pathname === "/layout/dashboard"
                ? IconType.home
                : IconType.home1
            }
            label={"Home"}
            selected={location.pathname === "/layout/dashboard"}
            onClick={() => {
              navigate("/layout/dashboard");
            }}
          />

          <MenuItem
            icon={
              location.pathname === "/layout/settings"
                ? IconType.Accounts
                : IconType.Accounts
            }
            label={"Settings"}
            selected={location.pathname === "/layout/settings"}
            onClick={() => {
              navigate("/layout/settings");
            }}
          />
        </Paper>
      </Paper>

      <Paper className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconHelp className={classes.linkIcon} stroke={1.5} />
          <span>Help</span>
        </a>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSettings2 className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </a>
      </Paper>
    </Group>
  );
};
