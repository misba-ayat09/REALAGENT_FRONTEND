import { API, API_Request_Status, Slug } from "../../../services";
import { StorageKeys, load } from "../../../utils";

export type LoginFormData = {
  emailOrUsername?: string;
  password: string;
};

export type AuthFormResult = {
  userId: string;
  emailId: string;
  isInWaitingList: boolean;
  token: string;
  refreshToken: string;
};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  timezone: string;
};
export interface GenerateNewAccessTokenBody {
  refreshToken: string;
}
export interface GenerateNewAccessTokenResponse {
  token: string;
  refreshToken: string;
}

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

const login = (formData: LoginFormData) => {
  return API.post<APIResponse<AuthFormResult>>({
    slug: Slug.LOGIN,
    body: formData,
  });
};

const register = (formData: RegisterFormData) =>
  API.post<APIResponse<AuthFormResult>>({
    slug: Slug.REGISTER,
    body: formData,
  });

const generateAccessToken = (body: GenerateNewAccessTokenBody) =>
  API.post<GenerateNewAccessTokenResponse>({
    slug: Slug.REFRESH,
    body,
  });

const setIsRealtorInterestedInAI = () => {
  const userData = load<{
    userId: string;
    email: string;
  }>(StorageKeys.USERDATA);
  if (userData && userData.userId) {
    return API.patch<APIResponse<unknown>>({
      slug: Slug.WAITING_LIST,
      body: {
        userId: userData.userId,
        isRealtorInterestedInAI: true,
      },
    });
  }
};

export const authenticationAPI = {
  login,
  register,
  generateAccessToken,
  setIsRealtorInterestedInAI,
};
