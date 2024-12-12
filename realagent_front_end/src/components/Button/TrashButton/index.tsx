import React from "react";
import { ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface TrashButtonProps {
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  iconSize?: number;
  defaultColor?: string;
  iconColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const TrashButton: React.FC<TrashButtonProps> = ({
  tooltipPosition = "bottom",
  iconSize = 16,
  defaultColor = "var(--mantine-color-blue-6)",
  iconColor = "#FFFFFF",
  onClick,
}) => {
  return (
    <Tooltip label={"Delete"} withArrow position={tooltipPosition}>
      <ActionIcon
        variant="subtle"
        onClick={onClick}
        size={rem(34)}
        bg={defaultColor}
        radius={"xl"}
      >
        <IconTrash style={{ width: rem(iconSize), color: iconColor }} />
      </ActionIcon>
    </Tooltip>
  );
};

export default TrashButton;
