import { Config } from "../../../config";
import { API, APIResponse, Slug } from "../../../services";
import {
  AyrSharePostFormData,
  PostFormData,
  SocialMediaContentFormData,
  SocialMediaContentType,
  SocialMediaPostType,
} from "./types";

const generateSocialMediaContent = async (
  formData: SocialMediaContentFormData
) => {
  const response = await fetch(Config.GENERATE_CONTENT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return (await response.json()) as unknown as SocialMediaContentType;
};

const sendSocialMediaPost = (formData: PostFormData) =>
  API.post<
    APIResponse<{
      message: string;
    }>
  >({
    slug: Slug.SOCIAL_MEDIA + "/send-post",
    body: formData,
  });
  const sendAyrSocialMediaPost = (formData: AyrSharePostFormData) =>
    API.post<
      APIResponse<{
        message: string;
      }>
    >({
      slug: Slug.AYRSHARE_POST,
      body: formData,
    });

const getAllSocialMediaPosts = () =>
  API.get<APIResponse<SocialMediaPostType[]>>({
    slug: Slug.SOCIAL_MEDIA + "/posts",
  });

const getSocialMediaPost = (postId: string) =>
  API.get<APIResponse<SocialMediaPostType>>({
    slug: Slug.SOCIAL_MEDIA + "/post",
    queryParameters: {
      postId,
    },
  });

export const socialMediaAgentAPI = {
  generateSocialMediaContent,
  sendSocialMediaPost,
  getAllSocialMediaPosts,
  getSocialMediaPost,
  sendAyrSocialMediaPost
};
