import { Text } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { isHtmlString } from '../../utils';

const TypingEffect: React.FC<{
  text: string;
  speed: number;
  onTyping?: (isTyping: boolean) => void;
}> = ({ text, speed, onTyping }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (index < text?.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      if (isTyping) {
        setIsTyping(false);
      }
    }
  }, [index, displayedText, text, speed, isTyping]);

  useEffect(() => {
    if (onTyping) {
      onTyping(isTyping);
    }
  }, [isTyping, onTyping]);

  return (
    <Text size="sm">
      {isHtmlString(displayedText) ? <span dangerouslySetInnerHTML={{ __html: displayedText }} /> : displayedText}
      {isTyping && <span className="cursor">|</span>}
    </Text>
  );
};

export default TypingEffect;
