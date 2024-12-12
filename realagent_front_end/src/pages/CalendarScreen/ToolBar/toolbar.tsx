import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import './toolbar.css';
import { Button, Flex } from '@mantine/core';
import { Icon } from '../../../components/common/Icons/Icon';
import { IconType } from '../../../components/common/Icons';

const Toolbar: React.FC<ToolbarProps> = ({ label, onNavigate, onView, view }) => {
  return (
    <Flex className="toolbar">
      <Button className="todayButton" type="button" onClick={() => onNavigate('TODAY')}>
        Today
      </Button>
      <Flex className="back_label_next">
        <Flex>
          <Button className="back_button" type="button" onClick={() => onNavigate('PREV')}>
            <Icon icon={IconType.BackArrow} style={{ width: '10px', height: '10px' }} />
          </Button>
        </Flex>
        <Flex className="label">{label}</Flex>
        <Flex>
          <Button className="back_button" type="button" onClick={() => onNavigate('NEXT')}>
            <Icon icon={IconType.NextArrow} style={{ width: '10px', height: '10px' }} />
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <Button
          className={`button1 view-button ${view === 'day' ? 'active' : 'inactive'}`}
          type="button"
          onClick={() => onView('day')}>
          Day
        </Button>
        <Button
          className={`button2 view-button ${view === 'week' ? 'active' : 'inactive'}`}
          type="button"
          onClick={() => onView('week')}>
          Week
        </Button>
        <Button
          className={`button3 view-button ${view === 'month' ? 'active' : 'inactive'}`}
          type="button"
          onClick={() => onView('month')}>
          Month
        </Button>
      </Flex>
    </Flex>
  );
};

export default Toolbar;
