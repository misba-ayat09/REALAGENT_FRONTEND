import { Box, Group, Text } from "@mantine/core";
import classes from "./SideMenu.module.css";
import React from "react";
import MenuItem from "./MenuItem";
import { IconType } from '../common/Icons';
import { useLocation, useNavigate } from "react-router-dom";

interface SideMenuParams {
  // activeTab?: FileData;
  // onTabChange?: (tab: string | null) => void;
}

export const SideMenu2: React.FC<SideMenuParams> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Group className={classes.sideMenu}>
      <>
        <Text ml={8} classNames={{ root: classes.title }}>
          Workspace
        </Text>
      </>
      <Box bg={"#F8F8F8"} w={"100%"} h={110} dir="column" p={10}>
        <MenuItem
          icon={IconType.summary}
          label={"Posts"}
          selected={location.pathname === "/layout1/socialmedia"}
          onClick={() => {
            navigate("/layout1/socialmedia");
          }}
        />
        <MenuItem
          icon={IconType.saved}
          label={"Activities"}
          selected={location.pathname === "/layout1/activities"}
          onClick={() => {
            navigate("/layout1/activities");
          }}
        />
      </Box>
      <Text ml={8} mt={20} classNames={{ root: classes.title }}>
        Setup
      </Text>
      <MenuItem
        icon={IconType.calendar}
        label={"Calendar"}
        selected={location.pathname === "/layout1/calendar"}
        onClick={() => {
          navigate("/layout1/calendar");
        }}
      />
      <MenuItem
        icon={IconType.DataSources}
        label={"Data Sources"}
        selected={location.pathname === "/layout1/datasources"}
        onClick={() => {
          navigate("/layout1/datasources");
        }}
      />
      <MenuItem
        icon={IconType.Interactions}
        label={"Interactions"}
        selected={location.pathname === "/layout1/interactions"}
        onClick={() => {
          navigate("/layout1/interactions");
        }}
      />
      <MenuItem
        icon={IconType.Accounts}
        label={"Accounts"}
        selected={location.pathname === "/layout1/accounts"}
        onClick={() => {
          navigate("/layout1/accounts");
        }}
      />
    </Group>
  );
};
