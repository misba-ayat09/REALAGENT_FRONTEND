import React from "react";
import { ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface TrashButtonProps {
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  iconSize?: number;
  defaultColor?: string;
  iconColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const EditButton: React.FC<TrashButtonProps> = ({
  tooltipPosition = "bottom",
  iconSize = 16,
  defaultColor = "var(--mantine-color-blue-6)",
  iconColor = "#FFFFFF",
  onClick,
}) => {
  return (
    <Tooltip label={"Edit"} withArrow position={tooltipPosition}>
      <ActionIcon
        variant="subtle"
        onClick={onClick}
        size={rem(34)}
        bg={defaultColor}
        radius={"xl"}
      >
        <IconEdit style={{ width: rem(iconSize), color: iconColor }} />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditButton;
