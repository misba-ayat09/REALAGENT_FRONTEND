import React from "react";
import { Divider, Flex, Paper, Text, useMantineTheme } from '@mantine/core';
import classes from "./MeetingCard.module.css";
import { formatDate } from "../../../utils";
import { CopyToClipboardButton } from "../../Button";
import SimpleButton from "../../Button/SimpleButton";
import { useNavigate } from "react-router-dom";
import { PATH_WEBSITE } from '../../../router/route';
import { Config } from "../../../config";
import { Meeting } from '../../../store/features/meetings/types';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import { AgentType } from '../../../common/enum/agent.enum';
import { useMeetingTimer } from '../../../hooks';

interface MeetingCardProps {
  meeting?: Meeting;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { isJoinEnabled } = useMeetingTimer(meeting?.meetingStart);

  const handleClickJoin = (meetingId: string) => navigate(PATH_WEBSITE.getMeetRoomRoute(meetingId));

  return (
    <Paper classNames={{ root: classes.main }}>
      {meeting ? (
        <>
          <Flex justify={'space-between'} align={'center'}>
            <Flex direction={'column'}>
              <Text classNames={{ root: classes.title }}>{meeting.topic}</Text>
              <Text classNames={{ root: classes.subTitle }}>{formatDate(new Date(meeting.meetingStart))}</Text>
            </Flex>
            <AgentIcon icon={AgentType.Website} type={AgentIconType.Type1} radius={'8px'} size={61} />
          </Flex>
          <Divider />
          <Flex mih={'77px'} direction={'column'} justify={'space-between'} align={'flex-start'}>
            {meeting.attendees.map((attendee) => (
              <Text key={attendee.email} classNames={{ root: classes.text }} truncate="end">
                {attendee.name} {attendee.email}
              </Text>
            ))}
            <Flex h={'100%'} w={'100%'} justify={'flex-end'} align={'flex-end'} gap={'12px'}>
              {isJoinEnabled ? (
                <CopyToClipboardButton
                  preset="text"
                  buttonText="Copy URL"
                  value={`https://${Config.MEET_DOMAIN}/${meeting?._id}`}
                  iconSize={16.17}
                  defaultColor={theme.colors.azureBlue[1]}
                  copiedColor={theme.colors.azureBlue[2]}
                  textColor={theme.colors.azureBlue[7]}
                />
              ) : null}
              <SimpleButton
                onClick={() => handleClickJoin(meeting._id)}
                disabled={!isJoinEnabled}
                bg={theme.colors.azureBlue[7]}
                color={theme.colors.azureBlue[7]}
                size={'sm'}
                text={'Join'}
                miw={'111px'}
              />
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex h={'100%'} align={'center'} justify={'center'}>
          <Text>No meetings scheduled</Text>
        </Flex>
      )}
    </Paper>
  );
};
