import React from 'react';
import { Flex, Text } from '@mantine/core';
import SimpleButton from '../../Button/SimpleButton';

interface DynamicCardProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ title, buttonText, onClick }) => {
  return (
    <Flex
      bg="#FFFFFF"
      w="100%"
      h="100%"
      mih="50rem"
      justify="center"
      align="center"
      direction="column"
      p={'10%'}
      gap={'20px'}
      style={{ zIndex: 2, borderRadius: 'calc(15px * var(--scale-factor))' }}>
      <Text className="title" mb={4} ta="center">
        {title}
      </Text>
      <SimpleButton text={buttonText} onClick={onClick} />
    </Flex>
  );
};

export default DynamicCard;
