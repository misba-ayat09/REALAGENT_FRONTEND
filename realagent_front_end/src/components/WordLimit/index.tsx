import React, { useState, useEffect } from "react";
import classes from "./WordLimit.module.css";

interface WordLimitProps {
  text?: string;
  limit: number;
}

export const WordLimit: React.FC<WordLimitProps> = ({ text = "", limit }) => {
  const [remainingWords, setRemainingWords] = useState(limit - (text ? text?.trim()?.length : 0));

  useEffect(() => {
    const calculatedRemainingWords = limit - (text ? text?.trim()?.length : 0);
    setRemainingWords(Math.max(calculatedRemainingWords, 0));
  }, [text, limit]);

  const className = remainingWords <= 5 ? classes.lowRemainingWords : classes.normalRemainingWords;

  return (
    <div className={className}>
      {remainingWords}/{limit}
    </div>
  );
};
