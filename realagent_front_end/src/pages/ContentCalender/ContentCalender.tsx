import React from 'react';
import { Flex } from '@mantine/core';
import Calendar from './calender';

const ContentCalendar: React.FC = () => {

  return (
    <Flex direction="column" style={{ height: '87vh' }}>
          {/* Calendar Section */}
          <Flex
            style={{
              flex: 2,
              margin: 0,
              padding: 0,
              width: '100%',
              height: '90%', // Ensure full height
            }}
          >
            <Calendar />
          </Flex>
        </Flex>
  );
};

export default ContentCalendar;
