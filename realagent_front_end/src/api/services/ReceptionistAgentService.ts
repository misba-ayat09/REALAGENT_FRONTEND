// import { API, APIResponse } from '../../services';
// import {
//   GetAccountInfoResponse,
//   CallListResponse,
//   RemoveNumberFormData,
//   RemoveNumberResponse,
//   CreateNumberFormData,
//   CreateNumberResponse,
//   AvailablePhoneNumbersResponse,
//   GetTwilioConfigResponse,
//   UpdateTwilioConfigFormData,
//   UpdateTwilioConfigResponse,
//   VoiceConfigResponse,
//   UpdateVoiceFormData,
//   UpdateVoiceResponse,
//   ListLogsResponse,
//   GenerateCallScriptFormData,
//   GenerateCallScriptResponse,
// } from '../types';

// export default class PhoneService {
//   static Slug = {
//     ACCOUNT_INFO: 'account-info',
//     CALL_LIST: 'call-list',
//     REMOVE_NUMBER: 'remove-number',
//     CREATE_TWILIO_NUMBER: 'create-twilio-number',
//     AVAILABLE_NUMBER: 'available-number',
//     TWILIO_CONFIG: 'configuration/twilio',
//     VOICE_CONFIG: 'configuration/voice',
//     VOICE: 'voice',
//     LIST_LOGS: 'call/log/list',
//     GENERATE_CALL_SCRIPT: 'call/script',
//   };

//   static GetAccountInfo = () =>
//     API.get<APIResponse<GetAccountInfoResponse>>({
//       slug: this.Slug.ACCOUNT_INFO,
//     });

//   static GetCallList = () =>
//     API.get<APIResponse<CallListResponse>>({
//       slug: this.Slug.CALL_LIST,
//     });

//   static RemoveNumber = (body: RemoveNumberFormData) =>
//     API.post<APIResponse<RemoveNumberResponse>>({
//       slug: this.Slug.REMOVE_NUMBER,
//       body,
//     });

//   static CreateTwilioNumber = (body: CreateNumberFormData) =>
//     API.post<APIResponse<CreateNumberResponse>>({
//       slug: this.Slug.CREATE_TWILIO_NUMBER,
//       body,
//     });

//   static ListAvailablePhoneNumbers = () =>
//     API.get<APIResponse<AvailablePhoneNumbersResponse>>({
//       slug: this.Slug.AVAILABLE_NUMBER,
//     });

//   static GetTwilioConfiguration = () =>
//     API.get<APIResponse<GetTwilioConfigResponse>>({
//       slug: this.Slug.TWILIO_CONFIG,
//     });

//   static UpdateTwilioConfiguration = (body: UpdateTwilioConfigFormData) =>
//     API.put<APIResponse<UpdateTwilioConfigResponse>>({
//       slug: this.Slug.TWILIO_CONFIG,
//       body,
//     });

//   static GetVoiceConfiguration = () =>
//     API.get<APIResponse<VoiceConfigResponse>>({
//       slug: this.Slug.VOICE_CONFIG,
//     });

//   static UpdateVoice = (body: UpdateVoiceFormData) =>
//     API.put<APIResponse<UpdateVoiceResponse>>({
//       slug: this.Slug.VOICE,
//       body,
//     });

//   static ListVoice = () =>
//     API.get<APIResponse<VoiceConfigResponse>>({
//       slug: this.Slug.VOICE,
//     });

//   static ListLogs = () =>
//     API.get<APIResponse<ListLogsResponse>>({
//       slug: this.Slug.LIST_LOGS,
//     });

//   static GenerateCallScript = (body: GenerateCallScriptFormData) =>
//     API.post<APIResponse<GenerateCallScriptResponse>>({
//       slug: this.Slug.GENERATE_CALL_SCRIPT,
//       body,
//     });
// }
