import { API, APIResponse, PaginatedData, Slug } from '../../services';
import { Activity } from '../../store/features/activities/types';
import { ActivityForm, ActivityQueryParameters } from '../types';

export default class ActivityService {
  static create = (body: ActivityForm) =>
    API.post<APIResponse<Activity>>({
      slug: Slug.ACTIVITY,
      body,
    });

  static findActivities = (params: ActivityQueryParameters) =>
    API.get<APIResponse<PaginatedData<Activity>>>({
      slug: Slug.ACTIVITY,
      queryParameters: params,
    });

  static find = (id: string) =>
    API.get<APIResponse<Activity>>({
      slug: Slug.ACTIVITY + `/${id}`,
    });
}
