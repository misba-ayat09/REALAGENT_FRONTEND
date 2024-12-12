import { Config } from '../../config';
import { API, APIResponse, Slug } from '../../services';
import { BrandingFormData, BrandingResponse, TemplateResponse } from '../types';

export default class SocialMediaBrandingService {
  static generateTemplate = (body: FormData) =>
    API.post<APIResponse<TemplateResponse>>({
      slug: Slug.TEMPLATEGENERATION,
      body,
    });

  static getBrandingData = () =>
    API.get<APIResponse<BrandingResponse>>({
      slug: Slug.SOCIALMEDIABRANDING,
    });

  static updateBrandingData = (body: BrandingFormData) =>
    API.patch<APIResponse<BrandingResponse>>({
      slug: Slug.SOCIALMEDIABRANDING,
      body,
    });

  static getAvailableFonts = async () => {
    try {
      const url = Config.ARTICLE_API_URL + '/available_fonts/';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { fonts: string[] } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  static getLayout = async (layoutNumber: number) => {
    try {
      const url = Config.SM_BASE_URL + `/poster_layout/${layoutNumber}`;
      const response = await fetch(url, {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { url: string } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}
