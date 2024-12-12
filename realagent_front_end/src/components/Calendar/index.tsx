import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import styles from './Calendar.module.css';

interface CalendarProps extends Partial<CalendarOptions> {}

const Calendar: React.FC<CalendarProps> = (props) => {
  const handleDayCellMount = (info: any) => {
    const today = new Date();
    const isToday =
      info.date.getFullYear() === today.getFullYear() &&
      info.date.getMonth() === today.getMonth() &&
      info.date.getDate() === today.getDate();

    if (isToday) {
      info.el.style.backgroundColor = '#FFF1A9';
    }
  };
  return (
    <div className={styles.calendarWrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        handleWindowResize
        aspectRatio={1.02}
        contentHeight={800}
        dayHeaderContent={(arg) => <span style={{ color: '#007BFF' }}>{arg.text}</span>}
        eventTextColor="'#007BFF'"
        dayCellDidMount={handleDayCellMount}
        {...props}
      />
    </div>
  );
};

export default Calendar;
