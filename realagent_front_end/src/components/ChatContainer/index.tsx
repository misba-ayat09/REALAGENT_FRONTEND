import React, { useEffect } from 'react';
import ChatBubble from './chatBubble';
import userImage from '../../assets/user.svg';
import botImage from '../../assets/bot.svg';
import { Button, Flex, Text } from '@mantine/core';
import { IconType } from '../common/Icons';
import { Icon } from '../common/Icons/Icon';
import './chatBubble/chat.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllCalls } from '../../store/features/ReceptionistAgent/receptionistAgentSlice';

interface ChatContainerProps {
  id: string;
  onBack: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onBack, id }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCalls());
  }, [dispatch]);
  const call = useAppSelector((state) => state.phoneAgent.calls?.items.find((call) => call.id === id));
  const messages = call ? call.messages : [];
  const PhoneNumber = useAppSelector(
    (state) => state.phoneAgent.calls?.items.find((call) => call.id === id)?.phoneNumber,
  );
  const date = useAppSelector((state) => state.phoneAgent.calls?.items.find((call) => call.id === id)?.createdAt);
  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString(undefined);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
          padding: '20px',
          width: '100%',
          background: 'white',
        }}>
        <Button
          className="button"
          onClick={onBack}
          leftSection={
            <Icon
              icon={IconType.leftArrow}
              style={{ position: 'relative', width: 'auto', height: '12px', top: '1px' }}
            />
          }
          style={{ width: '100px' }}>
          {' '}
          Back{' '}
        </Button>
        <Flex
          style={{
            gap: '15px',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '30px',
            background: 'white',
          }}>
          <Icon icon={IconType.user} style={{ width: '48px', height: '48px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: '16px', fontWeight: '600' }}>{PhoneNumber}</Text>
            <Text style={{ fontSize: '16px', fontWeight: '400' }}>
              {date ? formatDate(date) : 'Date not available'}
            </Text>
          </div>
        </Flex>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            minHeight: '100vh',
            marginTop: '50px',
          }}>
          {messages.map((msg) => (
            <ChatBubble message={msg.message} isUser={msg.role === 'user'} userImage={userImage} botImage={botImage} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
