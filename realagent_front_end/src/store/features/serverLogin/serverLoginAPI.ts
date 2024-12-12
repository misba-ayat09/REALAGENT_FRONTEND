import { API, API_Request_Status, Slug } from "../../../services";

export type ServerLoginFormData = {
  email: string;
  password: string;
};

export type ServerFormResult = {
  userId: string;
  emailId: string;
  isInWaitingList: boolean;
  token: string;
  refreshToken: string;
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

const serverlogin = (formData: ServerLoginFormData) => {
  return API.post<APIResponse<ServerFormResult>>({
    slug: Slug.SERVERLOGIN,
    body: formData,
  });
};

export const serverLoginAPI = {
  serverlogin,
};
