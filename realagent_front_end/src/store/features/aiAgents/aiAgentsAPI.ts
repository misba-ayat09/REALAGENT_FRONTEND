import { API, Slug } from '../../../services';

export type AiAgentsResponse = {
  status: 'success' | 'failed';
  result: AiAgents[];
};

export type AiAgents = {
  _id: string;
  agentName: string;
  description: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};
export type AddAiAgentsFormdata = {
  agentName: string;
  description: string;
  image: string;
  type: string;
};
export type UpdateAiAgentsFormdata = {
  _id: string;
  agentName: string;
  description: string;
  image: string;
  type: string;
};

const AddAiAgents = (formData: AddAiAgentsFormdata) =>
  API.post<AiAgents>({
    slug: Slug.ADD_AI_aGENT,
    body: formData,
  });

const getAllAiAgents = () => {
  return API.get<AiAgentsResponse>({
    slug: Slug.GET_AI_aGENT,
  });
};
const updateAiAgents = (formData: UpdateAiAgentsFormdata, id: string) => {
  return API.patch<AiAgentsResponse>({
    slug: Slug.UPDATE_AI_aGENT + `/${id}`,
    body: formData,
  });
};
const deleteAiAgents= (id: string) => {
  return API.delete<AiAgentsResponse>({
    slug: Slug.DELETE_AI_aGENT + `/${id}`,
  });
};
export const aiAgentsAPI = {
  AddAiAgents,
  getAllAiAgents,
  updateAiAgents,
  deleteAiAgents,
};
