import { API, APIResponse, Slug } from '../../../services';
import { CalendarData, CalendarEvent, CalendarEventFormData } from './types';

const getCalendarEvents = async () =>
  API.get<APIResponse<CalendarEvent[]>>({
    slug: Slug.CALENDAR,
  });

const addEventToCalendar = (formData: CalendarEventFormData) =>
  API.post<APIResponse<CalendarData>>({
    slug: Slug.CALENDAR,
    body: formData,
  });
const removeEventToCalendar = (id: string) =>
  API.delete<APIResponse<CalendarData[]>>({
    slug: Slug.CALENDAR + `/${id}`,
  });

const updateEventInCalendar = (id: string, formData: CalendarEventFormData) =>
  API.patch<APIResponse<CalendarData>>({
    slug: `${Slug.CALENDAR}/${id}`,
    body: formData,
  });

export const calendarAPI = {
  getCalendarEvents,
  addEventToCalendar,
  removeEventToCalendar,
  updateEventInCalendar,
};
