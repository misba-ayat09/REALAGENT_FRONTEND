import React from "react";
import { CopyButton, ActionIcon, Tooltip, Button, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyToClipboardButtonProps {
  value: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  timeout?: number;
  iconSize?: number;
  copiedColor?: string;
  defaultColor?: string;
  iconColor?: string;
  preset?: "icon" | "text";
  buttonText?: string;
  textColor?: string;
  className?: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  value,
  tooltipPosition = "bottom",
  timeout = 2000,
  iconSize = 16,
  copiedColor = "teal",
  defaultColor = "gray",
  iconColor = "#FFFFFF",
  textColor = "#FFFFFF",
  preset = "icon",
  buttonText = "Copy to Clipboard",
  className,
}) => {
  return (
    <CopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? "Copied" : "Copy"}
          withArrow
          position={tooltipPosition}
        >
          {preset === "icon" ? (
            <ActionIcon
              bg={copied ? copiedColor : defaultColor}
              variant="subtle"
              size={rem(34)}
              onClick={copy}
              radius="xl"
              className={className}
            >
              {copied ? (
                <IconCheck style={{ width: rem(iconSize), color: iconColor }} />
              ) : (
                <IconCopy style={{ width: rem(iconSize), color: iconColor }} />
              )}
            </ActionIcon>
          ) : (
            <Button
              onClick={copy}
              bg={copied ? copiedColor : defaultColor}
              color={copied ? copiedColor : defaultColor}
              styles={{ label: { color: textColor } }}
              radius="xl"
            >
              {copied ? "Copied!" : buttonText}
            </Button>
          )}
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyToClipboardButton;