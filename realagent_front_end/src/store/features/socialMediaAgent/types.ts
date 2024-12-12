import { SocialMediaPost } from '../../../api/types';
import { FileCategory, SocialMedia } from '../../../common/enum';
import { ApiCallStatus } from '../../../services';

export type PostFormData = {
  content: string;
  socialMedia: Array<SocialMedia>;
  fileName?: string;
  fileCategory?: FileCategory;
};

export type AyrSharePostFormData = {
  post: string;
  platform: SocialMedia[];
  fileName?: string;
  fileCategory?: FileCategory;
};

export type ArticleFormData = {
  urls: string[];
};

export type ArticleType = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  bussinessInsights: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
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

export type SocialMediaContentFormData = {
  prompt: string;
  word_count: number;
};

export type SocialMediaContentType = {
  post: string;
  hashtags: string;
};

export type SocialMediaPostType = {
  platformsPosted: Array<SocialMedia>;
  postId: string;
  content: string;
  postedAt: string;
};

export interface PostStatistics {
  likes: number;
  comments: number;
}

export interface SocialMediaAgentState {
  status: ApiCallStatus;
  articles: ArticleType[];
  posts: SocialMediaPostType[];
  post?: SocialMediaPostType;
  activities?: SocialMediaPost[];
}
