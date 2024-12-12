import { APIResponse } from "../authentication/authenticationAPI";
import { FileCategory } from "../../../common/enum/file-category.enum";
import { API, Slug } from "../../../services";

export interface FileUploadResponse {
  fileName: string;
  _id: string;
}

export interface GetAuthUrlResponse {
  signedUrl?: string;
}

export interface DataSourceFileFormData {
  contentType: FileCategory;
  fileName: string;
}

export interface chatBotFileFormData {
  contentType: FileCategory;
  fileName: string;
}

const uploadFile = (fileCategory: FileCategory, body: FormData) =>
  API.post<APIResponse<FileUploadResponse>>({
    slug: `${Slug.UPLOADFILE}/${fileCategory}`,
    body,
  });

const getAuthUrl = (fileCategory: FileCategory, fileName: string) =>
  API.get<APIResponse<GetAuthUrlResponse>>({
    slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
  });

const getDataSourceFile = (id?: string) =>
  API.get<APIResponse<FileUploadResponse>>({
    slug: Slug.DS_FILE,
    queryParameters: { id },
  });
const getDataSourceFiles = () =>
  API.get<APIResponse<FileUploadResponse[]>>({ slug: Slug.DS_FILE });

const createDataSourceFile = (body: DataSourceFileFormData) =>
  API.post<APIResponse<FileUploadResponse>>({
    slug: Slug.DS_FILE,
    body,
  });

const updateDataSourceFile = (body: DataSourceFileFormData, id: string) =>
  API.patch<APIResponse<FileUploadResponse>>({
    slug: Slug.DS_FILE + `/${id}`,
    body,
  });
const deleteDataSourceFile = (id: string) =>
  API.delete<APIResponse<FileUploadResponse>>({
    slug: Slug.DS_FILE + `/${id}`,
  });
const updateAuthUrl = (fileCategory: FileCategory, fileName: string) =>
  API.put<FileUploadResponse>({
    slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
  });

const removeAuthUrl = (fileCategory: FileCategory, fileName: string) =>
  API.delete<FileUploadResponse>({
    slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
    body: {
      fileName,
      fileCategory,
    },
  });

const getProfile = () =>
  API.get({
    slug: Slug.FILE,
  });

export const fileHubAPI = {
  uploadFile,
  getAuthUrl,
  updateAuthUrl,
  removeAuthUrl,
  getDataSourceFile,
  createDataSourceFile,
  updateDataSourceFile,
  deleteDataSourceFile,
  getDataSourceFiles,
  getProfile,
};
