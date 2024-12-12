import { ApiCallStatus } from '../../../services';
import { Messages } from '../chat/chatAPI';

export interface Transcription {
  meeting: string;
  summary: string;
  transcript: string;
  updatedAt: string;
  user: string;
  version: string;
}
export interface MeetingData {
  _id: string;
  meetingStart: string;
  meetingEnd: string;
  topic: string;
  transcription: Transcription;
  recording: string;
  description: string;
  attendees: Attendee[];
}

interface Attendee {
  email: string;
  name: string;
}

interface ChatBotHistoryData {
  _id: string;
  chatBot: string;
  summary: string;
  participant: Participant;
  messages: Messages[];
}

interface Participant {
  name: string;
  email: string;
}

export interface Activity {
  _id: string;
  meeting?: string;
  chatBot?: string;
  chatBotHistory?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
  meetingData?: MeetingData;
  chatBotHistoryData?: ChatBotHistoryData;
}

export interface ActivityState {
  status: ApiCallStatus;
  activities: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    list: Activity[];
  };
}
