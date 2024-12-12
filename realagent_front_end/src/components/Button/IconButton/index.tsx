import React from 'react';
import { ActionIcon, rem, Tooltip } from '@mantine/core';
import { Icon as TablerIcon, IconProps as TablerIconProps } from '@tabler/icons-react';

interface IconButtonProps {
  tooltipLabel?: string;
  icon: React.ForwardRefExoticComponent<TablerIconProps & React.RefAttributes<TablerIcon>>;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  iconSize?: number;
  defaultColor?: string;
  iconColor?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const IconButton: React.FC<IconButtonProps> = ({
  tooltipLabel = 'Icon',
  icon: Icon,
  tooltipPosition = 'bottom',
  iconSize = 16,
  defaultColor = 'var(--mantine-color-blue-6)',
  className,
  iconColor = '#FFFFFF',
  onClick,
}) => {
  return (
    <Tooltip label={tooltipLabel} withArrow position={tooltipPosition}>
      <ActionIcon
        className={className}
        variant="subtle"
        onClick={onClick}
        size={rem(34)}
        bg={defaultColor}
        radius={'xl'}>
        <Icon style={{ width: rem(iconSize), color: iconColor }} />
      </ActionIcon>
    </Tooltip>
  );
};

export default IconButton;
