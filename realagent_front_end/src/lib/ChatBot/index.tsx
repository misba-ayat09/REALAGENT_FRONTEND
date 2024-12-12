import { useState } from 'react';
import { Chatbot } from './components';

interface ChatBotProps {}

const ChatBot: React.FC<ChatBotProps> = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  return <Chatbot isExpanded={isFullScreen} setIsExpanded={setIsFullScreen} />;
};

export default ChatBot;
