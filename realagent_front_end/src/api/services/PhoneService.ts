import { API, APIResponse, Slug } from '../../services';
import { ScheduleCallFormData, ScheduleCallResponse } from '../types';

export default class PhoneService {
  static ScheduleCall = (body: ScheduleCallFormData) =>
    API.post<APIResponse<ScheduleCallResponse>>({
      slug: Slug.SCHEDULECALL,
      body,
    });
}
