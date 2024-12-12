import React, { useMemo } from 'react';
import { Card, Flex, Text } from '@mantine/core';
import { formatMeetingTime } from '../../utils';

interface ChatMessageProps {
  senderName: string;
  question: string;
  answer: string;
  questionTime: Date | number;
  answerTime: Date | number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ senderName, question, answer, questionTime, answerTime }) => {
  // Format the timestamps only once using useMemo
  const formattedAnswerTime = useMemo(() => formatMeetingTime(answerTime), [answerTime]);
  const formattedQuestionTime = useMemo(() => formatMeetingTime(questionTime), [questionTime]);

  return (
    <Card padding="lg" radius="md" className="chat-message">
      <Flex direction="column" align="flex-end" gap="xs" mb="md">
        <Flex align="center" justify="flex-end" gap="md">
          <Text fw={600} size="md">
            {senderName}
          </Text>
          <Text fw={400} size="sm" c="dimmed">
            {formattedQuestionTime}
          </Text>
        </Flex>

        <Flex align="center" justify="flex-end" gap="sm">
          <Text px="10px" py="5px" size="md" style={{ backgroundColor: '#FFFACC', borderRadius: '10px' }}>
            {question}
          </Text>
        </Flex>
      </Flex>

      <Flex justify="space-between" mb="sm">
        <Flex direction="row" gap="sm" align="center">
          <Text fw={600} size="md">
            Chat Bot
          </Text>
          <Text fw={400} size="sm" c="dimmed">
            {formattedAnswerTime}
          </Text>
        </Flex>
      </Flex>

      {answer && (
        <Flex align="center" justify="flex-start" gap="sm">
          <Text px="10px" py="5px" size="md" style={{ backgroundColor: '#CBEFD5', borderRadius: '10px' }}>
            {answer}
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default React.memo(ChatMessage);
