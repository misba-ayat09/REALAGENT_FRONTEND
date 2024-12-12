import { ApiCallStatus, PaginatedData } from '../../../services';

export type MeetingAttendee = {
  email: string;
  name?: string;
  meetingToken?: string;
};

export type Meeting = {
  _id: string;
  activity?: string;
  activityId?: string;
  topic: string;
  description: string;
  meetingStart: string;
  meetingEnd?: string;
  attendees: MeetingAttendee[];
  organizer: string;
  createdAt: string;
};

export interface MeetState {
  status: ApiCallStatus;
  pastMeetings: PaginatedData<Meeting>;
  upcomingMeetings: PaginatedData<Meeting>;
}
