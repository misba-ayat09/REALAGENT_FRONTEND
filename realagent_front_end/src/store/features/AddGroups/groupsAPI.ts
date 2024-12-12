import { API, APIResponse, Slug } from '../../../services';

export type GroupResponse = {
  status: 'success' | 'failed';
  result: Group[];
};

export type Group = {
  _id: string;
  contacts: Contact[];
  createdAt: string;
  updatedAt: string;
};
export type Contact = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  _id: string;
};
export type AddGroupFormdata = {
  file: FormData;
};

const AddGroup = (formData: AddGroupFormdata['file']) =>
  API.post<APIResponse<Group>>({
    slug: Slug.ADDGROUP,
    body: formData,
  });
const getAllGroup = () => {
  return API.get<GroupResponse>({
    slug: Slug.GETALLGROUP,
  });
};
const deleteGroup = (id: string) => {
  return API.delete<GroupResponse>({
    slug: Slug.DELETEGROUP + `/${id}`,
  });
};

export const groupAPI = {
  AddGroup,
  getAllGroup,
  deleteGroup,
};
