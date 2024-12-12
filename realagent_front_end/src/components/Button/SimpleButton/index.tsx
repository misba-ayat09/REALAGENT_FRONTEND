import React from "react";
import { Button, ButtonProps, Tooltip, MantineColor } from "@mantine/core";
import classes from './index.module.css';

interface SimpleButtonProps extends Omit<ButtonProps, 'children'> {
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  tooltipLabel?: string;
  text: string;
  color?: MantineColor;
  tooltipProps?: React.ComponentPropsWithoutRef<typeof Tooltip>;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  tooltipPosition = 'bottom',
  tooltipLabel,
  size = 'sm',
  color = 'var(--mantine-color-blue-6)',
  text,
  onClick,
  radius = 'xl',
  variant = 'filled',
  tooltipProps,
  ...buttonProps
}) => {
  const button = (
    <Button
      onClick={onClick}
      size={size}
      color={color}
      radius={radius}
      variant={variant}
      classNames={{
        root: classes.button,
        label: classes.buttonLabel,
      }}
      {...buttonProps}>
      {text}
    </Button>
  );

  if (tooltipLabel) {
    return (
      <Tooltip label={tooltipLabel} position={tooltipPosition} withArrow {...tooltipProps}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default SimpleButton;
