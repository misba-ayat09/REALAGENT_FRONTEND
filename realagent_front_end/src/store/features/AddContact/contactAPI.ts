import { API, Slug } from '../../../services';

export type ContactResponse = {
  status: 'success' | 'failed';
  result: Contact[];
};

export type Contact = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};
export type AddContactFormdata = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};
export type UpdateContactFormdata = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};

const AddContact = (formData: AddContactFormdata) =>
  API.post<Contact>({
    slug: Slug.ADDCONTACT,
    body: formData,
  });

const getAllContact = () => {
  return API.get<ContactResponse>({
    slug: Slug.GETALLCONTACT,
  });
};
const updateContact = (formData: UpdateContactFormdata, id: string) => {
  return API.patch<ContactResponse>({
    slug: Slug.UPDATECONTACT + `/${id}`,
    body: formData,
  });
};
const deleteContact = (id: string) => {
  return API.delete<ContactResponse>({
    slug: Slug.DELETECONTACT + `/${id}`,
  });
};

const importContact = (formData: FormData) => {
  return API.post<ContactResponse[]>({
    slug: Slug.IMPORTCONTACT,
    body: formData,
  });
};
export const contactAPI = {
  AddContact,
  getAllContact,
  updateContact,
  deleteContact,
  importContact,
};
