import { SocialMedia } from '../../common/enum';

export type ActivitiesResponse = SocialMediaPost[];

export type SocialMediaMetrics = {
  likeCount: number;
  commentsCount: number;
};

export type PlatformMetrics = Record<Partial<SocialMedia>, SocialMediaMetrics>;

export type SocialMediaPost = {
  ayrSharePostId: string;
  post: string;
  mediaUrls: string[];
  platformMetrics: PlatformMetrics;
  createdAt: string;
};
