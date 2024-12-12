import { API, APIResponse } from '../../../../services';
import { Slug } from '../../../../services/Api-Endpoints';

export type ListSocialMediaContentResponse = {
  status: string;
  result: Result1;
};

export type ListRegeneratedSocialMediaContentResponse = {
  status: string;
  result: Result1;
};
export type Result1 = {
  page: number;
  limit: number;
  total: number;
  list: Results[];
};

export type Result = {
  _id: string;
  prompt: string;
  wordCount: number;
  post: string;
  hashtags: string;
  image: string;
  isApproved: boolean;
  isPublished: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
  reseachId: string;
};

export type Results = {
  _id: string;
  prompt: string;
  wordCount: number;
  post: string;
  hashtags: string;
  isApproved: boolean;
  image: string;
  isPublished: boolean;
  user: [];
  platform: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
  reseachId: string;
};

export type ListConvertArticleToPostResponse = {
  status: string;
  result: Result3;
};

export type AddConvertArticleToPostFormData = {
  researchId: string;
};
export type Result3 = {
  _id: string;
  prompt: string;
  wordCount: number;
  post: string;
  hashtags: string;
  image: string;
  isApproved: boolean;
  researchId?: string;
  user: string;
  createdAt: Date;
};

export type AddSocialMediaContentFormData = {
  prompt: string;
  wordCount: number;
  contentCount: number;
};

export type RegenerateSocialMediaContentFormData = {
  id: string;
  wordCount: number;
};

export type UpdateContent = {
  id: string;
  prompt: string;
  post: string;
  platform: string[];
  hashtags: string;
  image: string;
  isApproved: boolean;
};

const AddConvertArticleToPost = (formData: AddConvertArticleToPostFormData) =>
  API.post<ListConvertArticleToPostResponse>({
    slug: Slug.CONVERT_ARTICLE_TO_POST,
    body: formData,
  });

const AddSocialMediaContent = (formData: AddSocialMediaContentFormData) =>
  API.post<ListSocialMediaContentResponse>({
    slug: Slug.ADD_SOCIAL_MEDIA_CONTENT,
    body: formData,
  });

const GetAllSocialMediaContent = (page: number, limit: number, sortOrder: string, isApproved: boolean) => {
  return API.get<ListSocialMediaContentResponse>({
    slug: Slug.SOCIAL_MEDIA_CONTENT,
    queryParameters: {
      page,
      limit,
      sortOrder,
      isApproved,
    },
  });
};

const deleteSocialMediaContent = (id: string) =>
  API.delete<APIResponse<ListSocialMediaContentResponse>>({
    slug: Slug.SOCIAL_MEDIA_CONTENT + `/${id}`,
  });
const reGenerateSocialMediaContent = (formData: RegenerateSocialMediaContentFormData) => {
  API.post<ListRegeneratedSocialMediaContentResponse>({
    slug: Slug.REGENERATE_SOCIAL_MEDIA_CONTENT,
    body: formData,
  });
};

const updateSocialMediaContent = (formData: Partial<UpdateContent> & { id: string }) =>
  API.patch<ListSocialMediaContentResponse>({
    slug: Slug.SOCIAL_MEDIA_CONTENT,
    body: formData,
  });

export const socalMediaContentAPI = {
  AddSocialMediaContent,
  GetAllSocialMediaContent,
  deleteSocialMediaContent,
  reGenerateSocialMediaContent,
  updateSocialMediaContent,
  AddConvertArticleToPost,
};
