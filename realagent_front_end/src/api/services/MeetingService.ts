import { MeetingStatus } from '../../common/enum';
import { API, APIPaginatedResponse, APIResponse, Slug } from '../../services';
import { MeetingQueryParameters, MeetingResponse, ScheduleMeetingFormData, UpdateMeetingFormData } from '../types';

export default class MeetingService {
  static create = (body: ScheduleMeetingFormData) =>
    API.post<APIResponse<MeetingResponse>>({
      slug: Slug.MEETINGS,
      body,
    });

  static generateToken = (meetingId: string) =>
    API.post<APIResponse<string>>({
      slug: Slug.GENERATETOKEN,
      body: {
        meetingId: meetingId,
      },
    });

  static processTranscription = (meetingId: string) =>
    API.post<APIResponse<string>>({
      slug: Slug.PROCESS_TRANSCRIPTION,
      body: {
        meetingId: meetingId,
      },
    });
  static findPast = (params: MeetingQueryParameters) =>
    API.get<APIPaginatedResponse<MeetingResponse>>({
      slug: Slug.MEETINGS,
      queryParameters: { meetingStatus: MeetingStatus.PAST, ...params },
    });

  static findUpcoming = (params: MeetingQueryParameters) =>
    API.get<APIPaginatedResponse<MeetingResponse>>({
      slug: Slug.MEETINGS,
      queryParameters: { meetingStatus: MeetingStatus.UPCOMING, ...params },
    });

  static findOne = (meetingId: string) =>
    API.get<APIResponse<MeetingResponse>>({
      slug: `${Slug.MEETINGS}` + `/${meetingId}`,
    });

  static update = (meetingId: string, body: UpdateMeetingFormData) =>
    API.patch<APIResponse<MeetingResponse>>({
      slug: Slug.MEETINGS + `/${meetingId}`,
      body,
    });

  static remove = (meetingId: string) =>
    API.delete<APIResponse<{ message: string; _id: string }>>({
      slug: Slug.MEETINGS + `/${meetingId}`,
    });
}
