import React from "react";
import { Group, Paper } from "@mantine/core";
import classes from "./SideMenu.module.css";
import MenuItem from "./MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { IconType } from "../common/Icons";

interface SideMenuParams {}

export const SideMenu3: React.FC<SideMenuParams> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Group className={classes.sideMenu}>
      <Paper className={classes.discoverWrapper}>
        <Paper className={classes.menuItemsWrapper}>
          <MenuItem
            icon={
              IconType.Publish
            }
            label="Publish"
            selected={location.pathname === "/contentcalender/publish"}
            onClick={() => navigate("/contentcalender/publish")}
          />
          <MenuItem
            icon={
             IconType.Activity
            }
            label="Activities"
            selected={location.pathname === "/contentcalender/activity"}
            onClick={() => navigate("/contentcalender/activity")}
          />
          <MenuItem
            icon={
             IconType.Brand
            }
            label="Brand Setup"
            selected={location.pathname === "/contentcalender/brand"}
            onClick={() => navigate("/contentcalender/brand")}
          />
          <MenuItem
            icon={
             IconType.Poster
            }
            label="Create Poster"
            selected={location.pathname === "/contentcalender/poster"}
            onClick={() => navigate("/contentcalender/poster")}
          />
        </Paper>
      </Paper>
    </Group>
  );
};