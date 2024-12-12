import { useState, useEffect, useMemo } from 'react';

interface Timer {
  hours: number;
  minutes: number;
  seconds: number;
}

const useMeetingTimer = (meetingStart?: string) => {
  const [timer, setTimer] = useState<Timer>({ hours: 0, minutes: 0, seconds: 0 });
  const [isJoinEnabled, setJoinEnabled] = useState(false);

  const meetingStartDate = useMemo(() => {
    return meetingStart ? new Date(meetingStart) : undefined;
  }, [meetingStart]);

  useEffect(() => {
    if (!meetingStartDate) return; // Exit early if no valid meetingStartDate

    const updateTimer = () => {
      const now = new Date().getTime();
      const timeUntilMeeting = meetingStartDate.getTime() - now;

      if (timeUntilMeeting > 0) {
        const hours = Math.floor((timeUntilMeeting % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilMeeting % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilMeeting % (1000 * 60)) / 1000);
        setTimer({ hours, minutes, seconds });
        setJoinEnabled(false);
      } else if (timeUntilMeeting <= 0) {
        // Once the meeting time is past, enable joining
        setTimer({ hours: 0, minutes: 0, seconds: 0 });
        setJoinEnabled(true);
      }
    };

    updateTimer(); // Initial update
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval); // Clean up on unmount
  }, [meetingStartDate]);

  return { timer, isJoinEnabled };
};

export default useMeetingTimer;
