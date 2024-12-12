import { ApiCallStatus } from '../../../services';

export type TopicFormData = {
  topic: string;
};
export type ResearchPostFormData = {
  headline: string;
  description: string;
  keypoints: string;
}
export type ResearchPostResponse = {
  summary: string;
  hashtags: string[];
}
export type ArticleType = {
  _id: string;
  title: string;
  content: string;
  keypoints?: string[];
  bussinessInsights: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};

export type TopicType = {
  _id: string;
  topic: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};

export interface VersionState {
  status: ApiCallStatus;
  articles: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    list: ArticleType[];
  };
  topics: TopicType[];
}
