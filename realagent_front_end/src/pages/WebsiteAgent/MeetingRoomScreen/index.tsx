import classes from './MeetingRoomScreen.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JitsiMeet, MeetingData } from '../../../components/Card/JitsiMeet';
import MeetingService from '../../../api/services/MeetingService';

const MeetingRoomScreen: React.FC = () => {
  const { roomId } = useParams();
  const [meetingData, setMeetingData] = useState<MeetingData>();

  useEffect(() => {
    void (async () => {
      if (roomId) {
        try {
          const response = await MeetingService.generateToken(roomId);
          if (response) {
            setMeetingData({
              id: roomId,
              jwt: response?.result,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
    return () => {
      setMeetingData(undefined);
    };
  }, [roomId]);
  return (
    <div className={classes.main}>
      <JitsiMeet meetingData={meetingData} />
    </div>
  );
};

export default MeetingRoomScreen;
