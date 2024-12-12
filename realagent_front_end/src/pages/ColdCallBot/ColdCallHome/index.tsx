/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@mantine/core';
import React from 'react';
import ColdCallHomeScreen from './coldCallHomeScreen';

const ColdCallHome: React.FC = () => {
  return (
    <Flex direction={'column'} gap={'5.5px'}>
      <Flex>
        <ColdCallHomeScreen />
      </Flex>
    </Flex>
  );
};

export default ColdCallHome;
