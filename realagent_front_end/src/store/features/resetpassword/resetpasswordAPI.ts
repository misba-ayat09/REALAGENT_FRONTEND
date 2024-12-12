import { API, API_Request_Status, Slug } from "../../../services";

export type ResetPasswordFormData = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type EmailVerificationFormData = {
  email: string;
};

export class APIResponse<T> {
  constructor(
    public status: API_Request_Status,
    public result: T,
    public statusCode: number
  ) {}
}
export class ResponseOK {
  message: string = "Ok";
  constructor(message: string) {
    this.message = message;
  }
}

export const verifyEmail = async (formData: EmailVerificationFormData) =>
  API.post<APIResponse<ResponseOK>>({
    slug: Slug.VERIFY_EMAIL,
    body: formData,
  });

export const resetPassword = async (formData: ResetPasswordFormData) =>
  API.post<APIResponse<ResponseOK>>({
    slug: Slug.RESET_PASSWORD,
    body: formData,
  });

export const resetPasswordAPI = {
  verifyEmail,
  resetPassword,
};
