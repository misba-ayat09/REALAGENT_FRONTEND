import { API, API_Request_Status, Slug } from '../../../services';

export type ChangePasswordFormData = {
  userId: string;
  password: string;
  confirmPassword: string;
};

export type OldPasswordVerificationFormData = {
  userId: string;
  oldPassword: string;
};

export class APIResponse<T> {
  constructor(public status: API_Request_Status, public result: T, public statusCode: number) {}
}
export class ResponseOK {
  message: string = 'Ok';
  constructor(message: string) {
    this.message = message;
  }
}

export const verifyOldPassword = async (formData: OldPasswordVerificationFormData) =>
  API.post<APIResponse<ResponseOK>>({
    slug: Slug.VERIFY_OLD_PASSWORD,
    body: formData,
  });

export const changePassword = async (formData: ChangePasswordFormData) =>
  API.post<APIResponse<ResponseOK>>({
    slug: Slug.CHANGE_PASSWORD,
    body: formData,
  });

export const changePasswordAPI = {
  verifyOldPassword,
  changePassword,
};
