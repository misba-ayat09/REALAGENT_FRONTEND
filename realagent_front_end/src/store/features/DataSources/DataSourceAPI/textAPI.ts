import { API, APIResponse, Slug } from "../../../../services";
import { UserType } from "../../researchAgent";
import { HasIdentitySignatures } from "../..";
export interface CreateParagraphFormData {
  content: string;
}

export interface CreateParagraphResult extends HasIdentitySignatures {
  _id: string;
  content: string;
  user: UserType;
}

// text
const createParagraph = (data: CreateParagraphFormData) =>
  API.post<APIResponse<CreateParagraphResult>>({
    slug: Slug.DS_PARAGRAPH,
    body: data,
  });

const updateParagraph = (id: string, data: CreateParagraphFormData) =>
  API.patch<APIResponse<CreateParagraphResult>>({
    slug: Slug.DS + `/${id}`,
    body: data,
  });

const getParagraph = (id: string, data: CreateParagraphFormData) =>
  API.get<APIResponse<CreateParagraphResult>>({
    slug: Slug.DS_PARAGRAPH,
    body: data,
    queryParameters: { id },
  });

const getAllParagraphs = () =>
  API.get<APIResponse<CreateParagraphResult[]>>({
    slug: Slug.DS,
  });

const deleteParagraph = (id: string) =>
  API.delete<APIResponse<CreateParagraphResult>>({
    slug: Slug.DS + `/${id}`,
  });

export const paragraphAPI = {
  createParagraph,
  updateParagraph,
  getParagraph,
  getAllParagraphs,
  deleteParagraph,
};
