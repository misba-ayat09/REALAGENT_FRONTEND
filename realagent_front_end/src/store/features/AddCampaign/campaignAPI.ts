import { API, Slug } from '../../../services';

export type CampaignResponse = {
  status: 'success' | 'failed';
  result: Campaign[];
};

export type Campaign = {
  _id: string;
  campaignTitle: string;
  purpose: string;
  campaignEvents?: string[];
  script?: string;
  user?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type AddCampaignFormdata = {
  campaignTitle: string;
  purpose: string;
  campaignEvents?: string[];
  script?: string;
};
export type UpdateCampaignFormdata = {
  _id: string;
  campaignTitle: string;
  purpose: string;
  campaignEvents?: string[];
  script?: string;
};

const AddCampaign = (formData: AddCampaignFormdata) =>
  API.post<Campaign>({
    slug: Slug.ADDCAMPAIGN,
    body: formData,
  });

const getAllCampaign = () => {
  return API.get<CampaignResponse>({
    slug: Slug.GETALLCAMPAIGN,
  });
};
const updateCampaign = (formData: UpdateCampaignFormdata, id: string) => {
  return API.patch<CampaignResponse>({
    slug: Slug.UPDATECAMPAIGN + `/${id}`,
    body: formData,
  });
};
const deleteCampaign = (id: string) => {
  return API.delete<CampaignResponse>({
    slug: Slug.DELETECAMPAIGN + `/${id}`,
  });
};

export const campaignAPI = {
  AddCampaign,
  getAllCampaign,
  updateCampaign,
  deleteCampaign,
};
