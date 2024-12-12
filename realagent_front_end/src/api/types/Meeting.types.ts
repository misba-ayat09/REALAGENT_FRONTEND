import { MeetingStatus } from '../../common/enum';
import { Meeting } from '../../store/features/meetings/types';

export type ScheduleMeetingFormData = Omit<Meeting, '_id' | 'organizer' | 'createdAt'>;

export interface MeetingResponse extends Meeting {
  updatedAt: string;
  version: number;
  __v: number;
}

export type UpdateMeetingFormData = ScheduleMeetingFormData;

export interface MeetingQueryParameters {
  page?: number;
  limit?: number;
  sortOrder?: 'ASC' | 'DESC';
  sortByName?: string;
  meetingStatus?: MeetingStatus;
}
