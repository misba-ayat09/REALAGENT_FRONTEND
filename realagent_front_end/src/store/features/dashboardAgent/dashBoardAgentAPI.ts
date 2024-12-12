import { API, ApiCallStatus, Slug } from '../../../services';

export enum DashboardData {
  MeetingSchedule = 'meetingSchedule',
  socialMediaContent = 'socialMediaContent',
  researchArticle = 'researchArticle',
  phoneCalls = 'phoneCalls',
  emailMessages = 'emailMessages',
}

export type MeetingScheduleDataType = {
  _id: string;
  meetingStart: string;
  meetingEnd: string;
  topic: string;
  description: string;
  attendees: Array<{
    email: string;
    name: string;
    meetingToken: string;
  }>;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};

export type SocialMediaContentDataType = {
  _id: string;
  prompt: string;
  wordCount: number;
  post: string;
  hashtags: string;
  image: string;
  isApproved: boolean;
  user: string;
  platform:string[]
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
  researchId: string;
};

export type ResearchArticleDataType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  keypoints?: string[];
  bussinessInsights: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};
export interface EmailMessagesDataType {
  _id: string;
  threadId: string;
  subject: string;
  from: string[];
  body: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  contentType: string;
  mimeType: string;
  preview: string;
  internalDate: string;
  haveAttachment: boolean;
  numberOfAttachments: number;
}
export type PhoneCallsDataType = {
  _id: string;
  phoneNumber: string;
  id: string;
  type: 'inbound' | 'outbound-api';
  recordingUrl: string;
  summary: string;
  createdAt: string;
  duration: string;
  messages: { role: string; message: string }[];
};

export type DashboardDataType = {
  _id: string;
  type: DashboardData;
  data:
    | MeetingScheduleDataType
    | SocialMediaContentDataType
    | ResearchArticleDataType
    | PhoneCallsDataType
    | EmailMessagesDataType;
};

export interface DashboardAgentState {
  status: ApiCallStatus;
  result: DashboardDataType[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
const getAllDashboardAgent = async (page: number, limit: number, sortOrder: string = 'desc') => {
  try {
    const response = await API.get<{
      result: {
        list: DashboardDataType[];
        page: number;
        total: number;
      };
    }>({
      slug: Slug.GETALLDASHBOARDDETAILS,
      queryParameters: {
        page,
        limit,
        sortOrder,
      },
    });
    return response?.result;
  } catch (error) {
    throw new Error('Failed to fetch dashboard agents');
  }
};

export const dashboardAgentAPI = {
  getAllDashboardAgent,
};
