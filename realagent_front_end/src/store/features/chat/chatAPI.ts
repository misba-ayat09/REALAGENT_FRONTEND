import { API } from "../../../services";
import { Slug } from "../../../services/Api-Endpoints";
import { APIResponse } from "../authentication/authenticationAPI";
export type ListMessagesResponse = {
  status: string;
  result: Results[];
};
export type Results= {
  _id: string;
  summary: string;
  messages: Messages[];
  participant: Users;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};
export type Users = {
  name: string;
  email: string;
};
export type Messages = {
  question: string;
  response: string;
  timestamp: number;
};
const generateSummaries = () => {
  return API.post<ListMessagesResponse>({
    slug: Slug.GENERATE_SUMMARIES,
    body: {},
  });
};
const getAllChat = () => {
  return API.get<ListMessagesResponse>({
    slug: Slug.GETALLCHAT,
  });
};
const getOneChat = (id: string) => {
  return API.get<APIResponse<Results>>({
    slug: Slug.GETALLCHAT + `/${id}`,
  });
};

export const chatAPI = {
  generateSummaries,
  getAllChat,
  getOneChat,
};
