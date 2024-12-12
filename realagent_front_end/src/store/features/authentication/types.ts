import { ApiCallStatus } from '../../../services';
import { ConnectedResponse } from './userApi';

export interface UserData {
  userId: string;
  profileId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
  dateOfBirth: string;
  subscription: string;
  profilePicture: string;
  phoneNumber: string;
  location: string;
  website: string;
  accessableAgents?: string[]; 

}

export interface UpdateAuth {
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

export interface AuthenticationState {
  status: 'idle' | 'loading' | 'failed' | ApiCallStatus;
  isAuthenticated: boolean;
  isInWaitingList: boolean;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
  userData: Partial<UserData>;
  connectedAccounts: ConnectedResponse[];
}
