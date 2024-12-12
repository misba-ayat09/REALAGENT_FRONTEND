/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Grid, Text } from '@mantine/core';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
import { CountDownTimer } from '../../CountDownTimer';
import { formatMeetingTime } from '../../../utils/dateUtils';
import { useAppSelector } from '../../../store';
import { PATH_WEBSITE } from '../../../router/route';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { Meeting } from '../../../store/features/meetings/types';
import SimpleButton from '../../Button/SimpleButton';
import { useMeetingTimer } from '../../../hooks';

interface JoinMeetingCardProps {
  meetingData: Meeting;
}

const JoinMeetingCard: React.FC<JoinMeetingCardProps> = ({ meetingData }) => {
  const navigate = useNavigate();

  const { timer, isJoinEnabled } = useMeetingTimer(meetingData.meetingStart);

  const data = {
    MeetTime: formatMeetingTime(meetingData.meetingStart) || '',
    Subject: meetingData.topic || '',
    Description: meetingData.description || '',
    MeetingId: meetingData._id || '',
  };

  const handleClick = (meetingId: string) => {
    navigate(PATH_WEBSITE.getMeetRoomRoute(meetingId));
  };
  const website = useAppSelector((state) => state.authentication.userData.website);
  return (
    <Grid
      w={'100%'}
      style={{
        background: 'linear-gradient(90.61deg, #000000 10%, #00006B 70%, #1E90FF 100%)',
        borderRadius: '20px',
        gap: '10px',
      }}>
      <Grid.Col
        h={{ xxl: '449px', lg: 350 }}
        p={40}
        display={'flex'}
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Flex direction={'column'} gap={'10px'} w={'50%'}>
          <FlexBox container flexDirection="row" alignContent="center" style={{ gap: '10px' }}>
            <Icon icon={IconType.Clock} />
            <Text c={'white'} fw={700} fz={24}>
              {data.MeetTime}
            </Text>
          </FlexBox>
          <Text c={'white'} fw={700} fz={24}>
            {data?.Subject}
          </Text>
          <Text c={'white'} fz={{ xxl: 18, lg: 14 }}>
            {data.Description}
          </Text>
          <div style={{ marginTop: '20px' }}>
            <CountDownTimer time={timer} />
          </div>

          <div>
            <SimpleButton
              w={'111px'}
              h={'40px'}
              disabled={!isJoinEnabled}
              text="Join"
              onClick={() => handleClick(data.MeetingId)}
            />
          </div>
        </Flex>
        <Box className="iframe-container">
          <iframe src={website} className="iframe" title="Website Preview" scrolling="no" />
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default JoinMeetingCard;
