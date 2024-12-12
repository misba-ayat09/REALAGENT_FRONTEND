import React, { MouseEventHandler } from 'react';
import classes from './MenuItems.module.css';
import { Flex, Text } from '@mantine/core';
import cx from 'clsx';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import { scalar } from '../../../helper';

interface MenuButtonProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  icons?: React.ReactNode;
}
const MenuItem: React.FC<MenuButtonProps> = ({ icon, label, selected, onClick, icons }) => {
  return (
    <Flex
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
      classNames={{
        root: cx(classes.menuItem, {
          [classes.menuItemSelected]: selected,
          [classes.pointer]: !selected,
        }),
      }}
      onClick={onClick}>
      <Icon style={{ width: scalar(41), height: scalar(41) }} icon={icon} />
      {icons}
      <Text
        classNames={{
          root: cx(classes.text, {
            [classes.selectedText]: selected,
          }),
        }}>
        {label}
      </Text>
    </Flex>
  );
};

export default MenuItem;
