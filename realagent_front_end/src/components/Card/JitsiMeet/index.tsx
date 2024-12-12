import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@mantine/core";
import { jitsiMeetingProps } from "./jitsiMeetingProps";
import { PATH_PAGES } from "../../../router/route";
import JitsiMeeting from "@jitsi/react-sdk/lib/components/JitsiMeeting";
import { Loading } from "../Loading/Loading";
import { useMeeting } from '../../../context/MeetingContext';

export interface MeetingData {
  id: string;
  jwt: string;
}

interface MeetingRoomProps {
  meetingData?: MeetingData;
}

export const JitsiMeet: React.FC<MeetingRoomProps> = ({ meetingData }) => {
  const navigate = useNavigate();
  const [isMeetingOpen, setIsMeetingOpen] = useState(true);
  const { processTranscription } = useMeeting();
  const onPressLeave = () => {
    if (meetingData?.id) {
      processTranscription(meetingData?.id);
    }
    setIsMeetingOpen(false);
    navigate(PATH_PAGES.dashboardHome);
  };

  return (
    <Flex h={'100vh'} w={'100%'} justify={'center'} align={'center'}>
      {isMeetingOpen ? (
        meetingData?.id ? (
          <>
            {import.meta.env.VITE_ENVIRONMENT === 'development' ? (
              <button
                type={'button'}
                className="MeetingRoom-leave-button"
                onClick={onPressLeave}
                style={{ position: 'absolute', right: '30px', top: '50px' }}>
                Leave
              </button>
            ) : null}
            <JitsiMeeting {...jitsiMeetingProps(meetingData?.id, meetingData?.jwt, onPressLeave)} />
          </>
        ) : (
          <Loading />
        )
      ) : (
        <Loading />
      )}
    </Flex>
  );
};
