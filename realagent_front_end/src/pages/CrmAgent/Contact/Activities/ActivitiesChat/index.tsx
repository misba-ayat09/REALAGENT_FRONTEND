import React, { useEffect } from "react";
import classes from "./index.module.css";
import { Button, Flex, Group, Text } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from '../../../../../components/common/Icons/Icon';
import { IconType } from '../../../../../components/common/Icons';
import Chat from "../../../../../components/ActivitychatCard/chat";
import { Results, chatAPI } from '../../../../../store/features/chat/chatAPI';
import { ApiResponseStatus } from '../../../../../services';

const ActivitiesChat: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');
  const [currentConversation, setCurrentConversation] = React.useState<Results>();

  useEffect(() => {
    const getCurrentConversation = async (id: string) => {
      const result = await chatAPI.getOneChat(id);
      if (result?.status == ApiResponseStatus.SUCCESS) {
        setCurrentConversation(result.result);
      }
    };
    if (chatId) {
      getCurrentConversation(chatId);
    }
  }, [chatId]);

  const handleClick = () => {
    navigate('/website/activities');
  };

  return (
    <Flex direction={'column'} gap={'2.5px'}>
      <Flex direction={'column'} bg={'#FFFFFF'}>
        <Group
          style={{
            alignItems: 'flex-start',
            margin: '20px',
          }}>
          <Button
            className={classes.button}
            onClick={handleClick}
            leftSection={<Icon icon={IconType.leftArrow} style={{ width: '11px', height: '20px' }} />}>
            Back
          </Button>
        </Group>
        <Group
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '20px',
            marginTop: '0px',
          }}>
          <>
            <Text className={classes.text2}>{currentConversation?.participant?.name ?? 'Client Name'}</Text>
            <Text className={classes.text3}>{currentConversation?.participant?.email ?? ''}</Text>
          </>
          <Text fw={400} fz={14} ff={'Roboto'} c={'#7A7A7A'}>
            {currentConversation?.summary}
          </Text>
        </Group>
        {currentConversation?.messages && (
          <Chat
            participantName={
              currentConversation?.participant?.name ? currentConversation?.participant?.name : 'Client Name'
            }
            messages={currentConversation?.messages}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ActivitiesChat;
