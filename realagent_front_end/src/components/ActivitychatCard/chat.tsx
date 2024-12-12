import React from "react";
import "./chat.css";
import { Messages } from "../../store/features/chat/chatAPI";
import ChatMessage from "./chatMessage";
import { Flex } from "@mantine/core";

const Chat: React.FC<{ messages: Messages[]; participantName: string }> = ({
  messages,
  participantName,
}) => {

  return (
    <div className="chat">
      <Flex px={20} style={{ borderTop: '2px solid #DCE5EA', width: '100%' }} h={40} w={'100%'}></Flex>
      {messages.map((message, index) => (
        <ChatMessage
          senderName={participantName}
          question={message?.question}
          answer={message.response}
          questionTime={message.timestamp}
          answerTime={message.timestamp}
          key={index}
        />
      ))}
    </div>
  );
};

export default Chat;
