// qna

import { HasId, HasIdentitySignatures } from "../.."
import { API, APIResponse, Slug } from "../../../../services"
import { UserType } from "../../researchAgent"
export interface CreateQuestionAnswerFormData {
  question:string
  answer:string
}

export interface CreateQuestionAnswerResponse extends HasIdentitySignatures ,HasId,CreateQuestionAnswerFormData {
  user:UserType
}

const getQuestionAnswer = (id:string) => API.get<APIResponse<CreateQuestionAnswerResponse>>({
    slug: Slug.DS_QNA,
    queryParameters:{  id }
  })
const getAllQuestionAnswer = () => API.get<APIResponse<CreateQuestionAnswerResponse[]>>({
    slug: Slug.DS_QNA 
  })
  const createQuestionAnswer = (data: CreateQuestionAnswerFormData) => API.post<APIResponse<CreateQuestionAnswerResponse>>({
    slug: Slug.DS_QNA,
    body: data
  })
  
  const updateQuestionAnswer = (id:string,data: CreateQuestionAnswerFormData) => API.patch<APIResponse<CreateQuestionAnswerResponse>>({
    slug: Slug.DS_QNA + `/${id}`,
    body: data
  })
  
  const deleteQuestionAnswer = (id:string) => API.delete<APIResponse<CreateQuestionAnswerResponse>>({
    slug: Slug.DS_QNA + `/${id}`,
  })
  

export const questionAnswerAPI = {getQuestionAnswer,createQuestionAnswer,updateQuestionAnswer,deleteQuestionAnswer,getAllQuestionAnswer}