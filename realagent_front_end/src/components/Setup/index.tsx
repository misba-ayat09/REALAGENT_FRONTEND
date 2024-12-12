import React, { useState, useMemo } from 'react';
import { Flex, ScrollArea, Text, Card, Button, Progress } from '@mantine/core';
import classes from './setUp.module.css';
import { useAppSelector } from '../../store';

interface SetupProps {
  questionCount?: number;
  qNumber?: number;
}

const Setup: React.FC<SetupProps> = ({ qNumber = 0 }) => {
  const questionAnswers = useAppSelector((state) => state.userChatBot.questionAnswers || []);

  const questionCount = qNumber || questionAnswers.length;
  const totalQuestions = 10;
  const completionRatio = useMemo(() => questionCount / totalQuestions, [questionCount]);

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleSeeMore = (key: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <Flex className={classes.container} direction="column" gap="lg" role="region" aria-labelledby="setup-header">
      <Flex className={classes.main} direction="column" gap="sm" align="flex-start">
        <Text id="setup-header" className={classes.text} tabIndex={0}>
          Initial Setup
        </Text>
        <Text className={classes.text1}>
          Completed {questionCount}/{totalQuestions}
        </Text>
      </Flex>

      <Progress
        value={completionRatio * 100}
        className={classes.progress}
        aria-valuenow={completionRatio * 100}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {completionRatio < 1 && (
        <Text className={classes.text2}>You can always say "I am not sure" if you are not sure about the answer.</Text>
      )}

      <ScrollArea className={classes.scrollArea} scrollbarSize={2} scrollHideDelay={0}>
        <Flex wrap="wrap" justify="flex-start" w={'100%'}>
          {questionAnswers.map((qa, index) => {
            const key = String(index);
            const isExpanded = expanded[key];
            const displayedText = isExpanded ? qa.answer : truncateText(qa.answer, 60);

            return (
              <Card key={qa.question} className={classes.card} w={'100%'} role="listitem">
                <Text fw={600}>{qa.question}</Text>
                <Text>{displayedText}</Text>
                {!isExpanded && qa.answer.length > 100 && (
                  <div>
                    <Button
                      variant="subtle"
                      onClick={() => toggleSeeMore(key)}
                      aria-expanded={isExpanded}
                      c={'#000000'}
                      p={0}>
                      See More
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Setup;
