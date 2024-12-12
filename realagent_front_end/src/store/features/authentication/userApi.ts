import { IconType } from '../../../components/common/Icons';
import { API, Slug } from '../../../services';
import { APIResponse } from './authenticationAPI';

export type updateUserInfo = {
  firstName?: string;
  lastName?: string;
  location?: string;
  website?: string;
  profilePicture?: string;
  timezone?: string;
  accessableAgents?: string[]; 
};
export type findUserInfoResponse = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
  profile: {
    _id: string;
    accessableAgents?: string[];
    dateOfBirth: string;
    subscription: string;
    profilePicture: string;
    phoneNumber: string;
    location: string;
    website: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type ConnectedResponse = {
  label: string;
  username: string;
  email: string;
  icon: IconType;
  redirectUrl: string;
  alreadyConnected: boolean;
  fetchAccountInformation: () => void;
};
export type DisconnectAccount = {
  socialMedia: string;
};
const fetchUserInfo = () => {
  return API.get<APIResponse<findUserInfoResponse>>({
    slug: Slug.USERS + '/personal',
  });
};
const updateProfile = (formData: updateUserInfo) => {
  return API.patch<APIResponse<findUserInfoResponse>>({
    slug: Slug.USERS,
    body: formData,
  });
};

const getConnectedAccounts = () => {
  return API.get<APIResponse<ConnectedResponse[]>>({
    slug: Slug.CONNECTED_ACCOUNTS,
  });
};
const disconnectAccounts = (socialMedia: string = '') => {
  return API.post<APIResponse<ConnectedResponse[]>>({
    slug: Slug.DISCONNECT_ACCOUNTS,
    body: {
      socialMedia: socialMedia.toLowerCase(),
    },
  });
};

const disconnectAyrAccount = (platform: string) => {
  return API.delete<APIResponse<ConnectedResponse[]>>({
    slug: Slug.AYRSHARE_DISCONNECT,
    queryParameters: {
      platform: platform.toLowerCase(),
    },
  });
};
export const userApi = {
  fetchUserInfo,
  updateProfile,
  getConnectedAccounts,
  disconnectAccounts,
  disconnectAyrAccount,
};
