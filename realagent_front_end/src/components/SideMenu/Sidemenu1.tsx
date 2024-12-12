import React from "react";
import { Button, Group, Paper, Text } from "@mantine/core";
import classes from "./SideMenu.module.css";
import { IconType } from '../common/Icons';
import MenuItem from "./MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { IconSettings2, IconHelp } from "@tabler/icons-react";

interface SideMenuParams {}

export const SideMenu1: React.FC<SideMenuParams> = () => {
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
              location.pathname === "/layout/schedule"
                ? IconType.schedule1
                : IconType.Schedule
            }
            label={"Schedule"}
            selected={location.pathname === "/layout/schedule"}
            onClick={() => {
              navigate("/layout/schedule");
            }}
          />
          <MenuItem
            icon={
              location.pathname === "/layout/datasources"
                ? IconType.dataSource1
                : IconType.DataSources
            }
            label={"Data Sources"}
            selected={location.pathname === "/layout/datasources"}
            onClick={() => {
              navigate("/layout/datasources");
            }}
          />
          <MenuItem
            icon={
              location.pathname === "/layout/accounts"
                ? IconType.account1
                : IconType.Accounts
            }
            label={"Accounts"}
            selected={location.pathname === "/layout/accounts"}
            onClick={() => {
              navigate("/layout/accounts");
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
