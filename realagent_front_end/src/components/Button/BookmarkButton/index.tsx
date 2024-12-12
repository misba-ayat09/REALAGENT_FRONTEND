import React, { useState } from "react";
import { ActionIcon, Tooltip, Loader, rem } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useLoadingState } from "../../../hooks";

interface BookmarkButtonProps {
  initialBookmarked?: boolean;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  iconSize?: number;
  bookmarkedColor?: string;
  defaultColor?: string;
  onBookmarkChange?: (bookmarked: boolean) => Promise<void>;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  initialBookmarked = false,
  tooltipPosition = "right",
  iconSize = 16,
  bookmarkedColor = "black",
  defaultColor = "black",
  onBookmarkChange = async () => {},
}) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isLoading, startLoading, finishLoading] =
    useLoadingState(initialBookmarked);

  const toggleBookmark = async () => {
    startLoading();
    try {
      await onBookmarkChange(!bookmarked);
      setBookmarked((prev) => !prev);
    } catch (error) {
      console.error("Failed to change bookmark state", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <Tooltip
      label={bookmarked ? "Bookmarked" : "Bookmark"}
      withArrow
      position={tooltipPosition}
    >
      <ActionIcon
        color={bookmarked ? bookmarkedColor : defaultColor}
        variant="subtle"
        onClick={toggleBookmark}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size="sm" />
        ) : bookmarked ? (
          <IconBookmarkFilled style={{ width: rem(iconSize) }} />
        ) : (
          <IconBookmark style={{ width: rem(iconSize) }} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default BookmarkButton;
