import { UserData } from '../../store/features/authentication/types';

export type LoginFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  userId: string;
  emailId: string;
  isInWaitingList: boolean;
  token: string;
  refreshToken: string;
};

export interface RegisterFormData extends Partial<UserData> {
  password: string;
}

export type RefreshFormData = {
  refreshToken: string;
};

export type RefreshResponse = {
  token: string;
  refreshToken: string;
};
