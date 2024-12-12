import React from "react";
import { Image, Paper, Text } from "@mantine/core";
import classes from "./AnnouncementCard.module.css";

interface AnnouncementCardProps {
  message: string;
  imageSrc?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  message,
  imageSrc,
}) => {
  return (
    <Paper classNames={{ root: classes.main }}>
      {imageSrc ? (
        <div className={classes.imageContainer}>
          <Image classNames={{ root: classes.image }} src={imageSrc} />
        </div>
      ) : null}
      <Text classNames={{ root: classes.text }}>{message}</Text>
    </Paper>
  );
};
