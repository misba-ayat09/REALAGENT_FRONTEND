export interface ScheduleCallFormData {
  contactIds: string[];
  dateTime: Date | string;
  message: string;
}

export interface ScheduleCallResponse {
  message: string;
}
