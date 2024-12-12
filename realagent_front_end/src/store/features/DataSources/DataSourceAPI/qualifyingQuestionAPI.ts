// qna

import { HasId, HasIdentitySignatures } from '../..';
import { API, APIResponse, Slug } from '../../../../services';
import { UserType } from '../../researchAgent';

export interface CreateQualifyingQuestionFormData {
  question: string;
  answer: string;
}

export interface CreateQualifyingQuestionResponse
  extends HasIdentitySignatures,
    HasId,
    CreateQualifyingQuestionFormData {
  user: UserType;
}

const getQualifyingQuestion = (id: string) =>
  API.get<APIResponse<CreateQualifyingQuestionResponse>>({
    slug: Slug.DS_QQ,
    queryParameters: { id },
  });
const getAllQualifyingQuestion = () =>
  API.get<APIResponse<CreateQualifyingQuestionResponse[]>>({
    slug: Slug.DS_QQ,
  });
const createQualifyingQuestion = (data: CreateQualifyingQuestionFormData) =>
  API.post<APIResponse<CreateQualifyingQuestionResponse>>({
    slug: Slug.DS_QQ,
    body: data,
  });

const updateQualifyingQuestion = (id: string, data: CreateQualifyingQuestionFormData) =>
  API.patch<APIResponse<CreateQualifyingQuestionResponse>>({
    slug: Slug.DS_QQ + `/${id}`,
    body: data,
  });

const deleteQualifyingQuestion = (id: string) =>
  API.delete<APIResponse<CreateQualifyingQuestionResponse>>({
    slug: Slug.DS_QQ + `/${id}`,
  });

export const qualifyingQuestionAPI = {
  getQualifyingQuestion,
  createQualifyingQuestion,
  updateQualifyingQuestion,
  deleteQualifyingQuestion,
  getAllQualifyingQuestion,
};
