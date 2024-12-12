import { FileCategory } from '../../common/enum';
import { Config } from '../../config';
import { API, APIResponse, Slug } from '../../services';
import { FileUploadResponse, GetAuthUrlResponse } from '../types';

export default class FileService {
  static create = async (fileCategory: FileCategory, body: FormData) => {
    try {
      return await API.post<APIResponse<FileUploadResponse>>({
        slug: `${Slug.UPLOADFILE}/${fileCategory}`,
        body,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  static findOne = async (fileCategory: FileCategory, fileName: string) => {
    try {
      return await API.get<APIResponse<GetAuthUrlResponse>>({
        slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
      });
    } catch (error) {
      console.error('Error getting auth URL:', error);
      throw error;
    }
  };

  static getStreamUrl = (fileCategory: FileCategory, fileName: string) => {
    return Config.API_URL + `${Slug.FILE}/stream?fileCategory=${fileCategory}&fileName=${fileName}`;
  };

  static getBlob = async (fileCategory: FileCategory, fileName: string) => {
    try {
      const url = this.getStreamUrl(fileCategory, fileName);
      const response = await fetch(url, {
        method: 'GET',
      });
      return await response.blob();
    } catch (error) {
      console.error('Error getting Blob:', error);
      throw error;
    }
  };

  static update = async (fileCategory: FileCategory, fileName: string, body: FormData) => {
    try {
      return await API.put<FileUploadResponse>({
        slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
        body,
      });
    } catch (error) {
      console.error('Error updating auth URL:', error);
      throw error;
    }
  };

  static remove = async (fileCategory: FileCategory, fileName: string) => {
    try {
      return await API.delete<FileUploadResponse>({
        slug: `${Slug.FILE}/${fileCategory}/${fileName}`,
      });
    } catch (error) {
      console.error('Error removing auth URL:', error);
      throw error;
    }
  };
}
