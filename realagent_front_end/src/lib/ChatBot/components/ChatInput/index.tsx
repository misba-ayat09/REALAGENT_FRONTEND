import React from "react";
import classes from "./ChatInput.module.css";
import { Input, Loader, UnstyledButton } from "@mantine/core";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading:boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, onSend ,isLoading = false}) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      onSend();
    }
  };

  return (
    <Input
      type="text"
      placeholder="Ask me anything..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      w={"100%"}
      classNames={{ input: classes.input }}
      rightSectionWidth={"65px"}
      rightSection={<UnstyledButton disabled={isLoading}>{isLoading?<Loader color="rgba(255, 255, 255, 1)" type="dots" />:"Send"}</UnstyledButton>}
      rightSectionProps={{ onClick: () => onSend(), className: classes.button }}
      rightSectionPointerEvents={"fill"}
    />
  );
};

export default ChatInput;
