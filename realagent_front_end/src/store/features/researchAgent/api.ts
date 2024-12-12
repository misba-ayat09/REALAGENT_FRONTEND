import { API, APIResponse, ARTICLE_API, PaginatedData, Slug } from '../../../services';
import { ArticleType, ResearchPostFormData, ResearchPostResponse, TopicFormData, TopicType } from './types';

const getArticles = async (page: number, limit: number, sortOrder: string) =>
  API.get<APIResponse<PaginatedData<ArticleType>>>({
    slug: Slug.RESEARCH_AGENT_ARTICLE,
    queryParameters: {
      page,
      limit,
      sortOrder,
    },
  });

const addResearchAgentLink = (formData: TopicFormData) =>
  API.post<APIResponse<TopicType>>({
    slug: Slug.ADD_RESEARCH_AGENT_TOPIC,
    body: formData,
  });
const addResearchPost = (formData: ResearchPostFormData) =>
  ARTICLE_API.post<ResearchPostResponse>({
    slug: Slug.POSTRESEARCH,
    body: formData,
  });

const getResearchAgentTopics = () =>
  API.get<APIResponse<TopicType[]>>({
    slug: Slug.GET_RESEARCH_AGENT_TOPIC,
  });

const getResearchAgentLink = (id: string) =>
  API.get<APIResponse<TopicType[]>>({
    slug: Slug.GET_RESEARCH_AGENT_TOPIC + `/${id}`,
  });

const removeResearchAgentLink = (id: string) =>
  API.delete<APIResponse<TopicType[]>>({
    slug: Slug.DELETE_RESEARCH_AGENT_TOPIC + `/${id}`,
  });
const deleteResearchAgentArticle = (id: string) =>
  API.delete<APIResponse<TopicType[]>>({
    slug: Slug.RESEARCH_AGENT_ARTICLE + `/${id}`,
  });
export const researchAgentAPI = {
  addResearchAgentLink,
  getResearchAgentTopics,
  getResearchAgentLink,
  removeResearchAgentLink,
  deleteResearchAgentArticle,
  getArticles,
  addResearchPost,
};
