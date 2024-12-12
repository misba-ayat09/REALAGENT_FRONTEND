import { API, APIResponse, Slug } from '../../services';
import { AuthResponse, LoginFormData, RegisterFormData, RefreshFormData, RefreshResponse } from '../types';

export default class AuthService {
  static login = async (body: LoginFormData) => API.post<APIResponse<AuthResponse>>({ slug: Slug.LOGIN, body });

  static register = async (body: RegisterFormData) =>
    API.post<APIResponse<AuthResponse>>({ slug: Slug.REGISTER, body });

  static refresh = async (body: RefreshFormData) =>
    API.post<APIResponse<RefreshResponse>>({ slug: Slug.REFRESH, body });
}
