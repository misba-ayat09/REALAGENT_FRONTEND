import { API, APIResponse, Slug } from '../../services';
import { ActivitiesResponse } from '../types';

export default class SocialMediaService {
  static getActivities = () =>
    API.get<APIResponse<ActivitiesResponse>>({
      slug: Slug.AYRSHARE_ACTIVITIES,
    });
}
