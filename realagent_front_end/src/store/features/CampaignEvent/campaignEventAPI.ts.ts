import { API, Slug } from '../../../services';

export type CampaignEventResponse = {
  status: 'success' | 'failed';
  result: result;
};

export type result = {
  page: number;
  limit: number;
  total: number;
  list: list[];
}
export type Contact = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  _id: string;
};
export type Group = {
  _id: string;
  contacts: Contact[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type list = {
  _id: string;
  scheduledDate: string;
  status: Status;
  group: Group;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type Status = {
  accepted: number;
  rejected: number;
};
export type AddCampaignEventFormdata = {
  scheduledDate: string | null;
  group: string;
  campaign: string;
};
const addCampaignEvent = (formData: AddCampaignEventFormdata) =>
  API.post<list>({
    slug: Slug.ADDCAMPAIGNEVENTS,
    body: formData,
  });

const getAllCampaignEvents = (page: number, limit: number, sortOrder: string, isApproved: boolean) => {
  return API.get<CampaignEventResponse>({
    slug: Slug.GETALLCAMPAIGNEVENTS,
    queryParameters: {
      page,
      limit,
      sortOrder,
      isApproved,
    },
  });
};

const deleteCampaignEvent = (id: string) => {
  return API.delete<CampaignEventResponse>({
    slug: Slug.DELETECAMPAIGNEVENTS + `/${id}`,
  });
};

export const campaignEventAPI = {
  getAllCampaignEvents,
  deleteCampaignEvent,
  addCampaignEvent,
};
