import React from 'react';
import './chat.css';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  userImage?: string;
  botImage?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, userImage, botImage }) => {
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      <div className="chat-bubble-content">
        {!isUser && (
          <div className="bot-container">
            <img src={botImage} alt="Bot" className="avatar" />
            <span className="label">Bot</span>
          </div>
        )}
        <div className="message">{message}</div>
        {isUser && (
          <div className="user-container">
            <img src={userImage} alt="User" className="avatar" />
            <span className="label">You</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
