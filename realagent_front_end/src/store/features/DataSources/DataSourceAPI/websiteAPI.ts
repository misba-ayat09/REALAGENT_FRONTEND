import { HasId, HasIdentitySignatures } from "../..";
import { API, APIResponse, Slug } from "../../../../services";
import { UserType } from "../../researchAgent";

export interface CreateWebsiteUrlFormData{
    url: string

}

export interface CreateWebsiteUrlResponse extends HasId,HasIdentitySignatures{
    url: string,
    user:UserType
}


const getAllWebsiteUrls = async () => API.get<APIResponse<CreateWebsiteUrlResponse[]>>({
  slug: Slug.DS_WEBSITE
})

const getWebsiteUrl = async (id:string) => API.get<APIResponse<CreateWebsiteUrlResponse>>({
  slug: Slug.DS_WEBSITE,
  queryParameters:{  id }
})

const createWebsiteUrl = async (formData: CreateWebsiteUrlFormData) => API.post<APIResponse<CreateWebsiteUrlResponse>>({
  slug: Slug.DS_WEBSITE,
  body: formData
})

const updateWebsiteUrl = async (
  id: string,
  formData: CreateWebsiteUrlFormData
) =>
  API.patch<APIResponse<CreateWebsiteUrlResponse>>({
    slug: Slug.DS_WEBSITE + `/${id}`,
    body: formData,
  });

const deleteWebsiteUrl = async (id:string) => API.delete<APIResponse<CreateWebsiteUrlResponse>>({
  slug: Slug.DS_WEBSITE +`/${id}`
})



export const websiteAPI = {
  getAllWebsiteUrls,
  getWebsiteUrl,
  createWebsiteUrl,
  updateWebsiteUrl,
  deleteWebsiteUrl
}