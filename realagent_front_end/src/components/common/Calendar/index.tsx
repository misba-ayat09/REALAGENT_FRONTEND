import {
  Calendar as BigCalendar,
  CalendarProps,
  Components,
  Event,
  EventProps,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import './calendar.css';
import { Paper } from '@mantine/core';
import { useMemo } from 'react';
import Toolbar from './ToolBar/toolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export interface CalendarEvent extends Event {
  description?: string;
  attendees?: string[];
}

export default function Calendar(props: Omit<CalendarProps, 'localizer'>) {
  const { components } = useMemo<{ components: Components<CalendarEvent, object> }>(
    () => ({
      components: {
        day: {
          header: (props) => <div>{props.label}</div>,
          event: eventMonth,
        },
        week: {
          header: (props) => <div>{props.label}</div>,
          event: eventMonth,
        },
        work_week: {
          header: (props) => <div>{props.label}</div>,
          event: eventMonth,
        },
        month: {
          header: (props) => <div>{props.label}</div>,
          dateHeader: (props) => <div>{props.label}</div>,
          event: eventMonth,
        },
        toolbar: Toolbar,
      },
    }),
    [],
  );

  return (
    <Paper mih={'580px'} w={'100%'}>
      <BigCalendar
        {...props}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 580 }}
        localizer={localizer}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        eventPropGetter={customEventPropGetter}
        components={components}
      />
    </Paper>
  );
}

function customEventPropGetter() {
  return {
    style: {
      border: '2px solid #007BFF',
      fontWeight: '700',
    },
    className: 'event',
  };
}

function eventMonth({ event }: EventProps<CalendarEvent>) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event?.description ?? 'description'}</p>
    </span>
  );
}
