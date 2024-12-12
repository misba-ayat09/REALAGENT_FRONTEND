import React, { MouseEventHandler } from 'react';
import classes from './MenuButton.module.css';
import { Button, Flex } from '@mantine/core';
import cx from 'clsx';
import { useMediaQuery } from '@mantine/hooks';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import { scalar } from '../../../helper';

interface MenuButtonProps {
  icon: IconType;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onClick }) => {
  const matches = useMediaQuery('(min-width: 800px)');

  return (
    <Flex
      classNames={{
        root: cx(classes.menuButton, classes.menuButtonSelected),
      }}
      onClick={onClick}>
      <Icon style={{ width: scalar(24), height: scalar(24) }} icon={icon} />
      {matches ? (
        <Button
          classNames={{
            root: cx(classes.text, classes.selectedText),
          }}>
          {label}
        </Button>
      ) : null}
    </Flex>
  );
};
export default MenuButton;
