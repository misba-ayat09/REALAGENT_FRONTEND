import { ApiCallStatus } from "../../../services";

export type ReminderOverride = {
  method: "email" | "popup";
  minutes: number;
};

export type EventTime = {
  dateTime: string;
  timeZone: string;
};

export type Attendee = {
  email?: string;
  name?: string;
};

export type EventUser = {
  email: string;
  self: boolean;
};

export type Transparency = "transparent" | "opaque";

export type EventType =
  | "default"
  | "outOfOffice"
  | "focusTime"
  | "workingLocation"
  | "fromGmail";

export type CalendarType = "calendar#event";

export type CalendarEventStatus = "confirmed" | "tentative" | "cancelled";

export interface CalendarData {
  kind: CalendarType;
  etag: string;
  id: string;
  status: CalendarEventStatus;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: EventUser;
  organizer: EventUser;
  start: EventTime;
  end: EventTime;
  transparency: Transparency;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
    overrides: ReminderOverride[];
  };
  eventType: EventType;
}
export interface CalendarEvent {
  id: string;
  start: string;
  end: string;
  topic: string;
  description: string;
  attendees: Attendee[];
}
export interface CalendarEventFormData {
  summary: string;
  start: EventTime;
  end: EventTime;
  transparency?: Transparency;
  sequence?: number;
  reminders: {
    useDefault: boolean;
    overrides?: ReminderOverride[];
  };
  eventType?: EventType;
  attendees?: Attendee[];
}

export interface CalendarState {
  status: ApiCallStatus;
  calendarData: Array<CalendarEvent>;
}
