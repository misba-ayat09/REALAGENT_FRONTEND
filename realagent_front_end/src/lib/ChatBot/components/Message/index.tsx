import React from 'react';
import { Text } from '@mantine/core';
import TypingEffect from '../../../../components/TypingEffect';
import { formatDate } from '../../../../utils';
import styles from './Message.module.css';
import { UserChatBotConveresation } from '../../../../api/types';

interface MessageProps {
  isChat?: boolean;
  message: UserChatBotConveresation;
  isLastMessage?: boolean;
  onTyping?: (isTyping: boolean) => void;
}

const Message: React.FC<MessageProps> = ({ isChat = true, message, isLastMessage = false, onTyping }) => {
  const { user, text, timestamp } = message;

  if (!message || !user || !text) {
    console.error('Invalid message object:', message);
    return null;
  }

  const isUser = user === 'user';
  const userDisplayName = isUser ? 'You' : isChat ? 'Realtor Assistant' : '';

  const messageClass = `${styles.message} ${
    isUser ? styles.messageUser : isChat ? styles.messageBot : styles.messageQn
  }`;

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.messageContainer}>
        <Text size="xs" className={`${styles.dateTime} ${isUser ? styles.dateTimeRight : styles.dateTimeLeft}`}>
          <Text component="span" fw={400} size="sm" c="#000000">
            {userDisplayName}
          </Text>
          {` • ${formatDate(new Date(timestamp))}`}
        </Text>
        <div className={messageClass}>
          {user === 'bot' && isLastMessage ? (
            <TypingEffect text={text} speed={10} onTyping={onTyping} />
          ) : (
            <Text size="sm" style={{ fontSize: '14px', fontWeight: isUser ? 400 : 500 }}>
              {text}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
