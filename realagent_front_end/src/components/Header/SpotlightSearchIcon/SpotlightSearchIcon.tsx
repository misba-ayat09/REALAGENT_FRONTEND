import React from "react";
import { ThemeIcon } from "@mantine/core";
import classes from "./SpotlightSearchIcon.module.css";
import cx from "clsx";
import { useHover } from "@mantine/hooks";
import { spotlight } from '@mantine/spotlight';
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
import { scalar } from '../../../helper';

export const SpotlightSearchIcon: React.FC = () => {
  const { hovered, ref } = useHover();

  return (
    <ThemeIcon
      ref={ref}
      radius="xl"
      variant="filled"
      className={cx(classes.iconContainer, {
        [classes.iconActive]: hovered,
      })}
      onMouseDown={(e) => {
        e.preventDefault();
        spotlight.open();
      }}>
      <Icon
        icon={IconType.Search}
        style={{ width: scalar(24), height: scalar(24) }}
        containerClassName={classes.icon}
      />
    </ThemeIcon>
  );
};
