import React, { useMemo } from "react";
import { Paper } from "@mantine/core";
import classes from "./AnnouncementPanel.module.css";
import { MeetingCard } from "./MeetingCard";
import { VerticalCarousel } from "../VerticalCarousel";
import { useAppSelector } from "../../store";

export const AnnouncementPanel: React.FC = () => {
  const { list: upcomingMeetings } = useAppSelector((state) => state.meeting.upcomingMeetings);

  const slides = useMemo(() => {
    if (!upcomingMeetings || upcomingMeetings?.length === 0) {
      return [
        {
          key: 1,
          content: <MeetingCard />,
        },
      ];
    }
    return upcomingMeetings.map((meeting) => {
      return {
        key: meeting._id,
        content: <MeetingCard meeting={meeting} />,
      };
    });
  }, [upcomingMeetings]);

  return (
    <Paper classNames={{ root: classes.main }}>
      <VerticalCarousel slides={slides} autoPlay={true} autoPlayDelay={9000} />
    </Paper>
  );
};
