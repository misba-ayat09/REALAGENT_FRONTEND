export enum RealTimeEventName {
  UNKNOWN = 'UNKNOWN',

  ON_CONNECT = 'ON_CONNECT',
  ON_DISCONNECT = 'ON_DISCONNECT',

  RECONNECT_TO_ACTIVE_SESSION = 'RECONNECT_TO_ACTIVE_SESSION',

  NOTIFY_ALL = 'NOTIFY_ALL',
  NOTIFY_USER = 'NOTIFY_USER',

  MEETING_CHATBOT_ADD_REQUEST = 'MEETING_CHATBOT_ADD_REQUEST',
  MEETING_CHATBOT_ADD_RESPONSE = 'MEETING_CHATBOT_ADD_RESPONSE',
  MEETING_CHATBOT_UPDATE_REQUEST = 'MEETING_CHATBOT_UPDATE_REQUEST',
  MEETING_CHATBOT_UPDATE_RESPONSE = 'MEETING_CHATBOT_UPDATE_RESPONSE',
  MEETING_CHATBOT_DELETE_REQUEST = 'MEETING_CHATBOT_DELETE_REQUEST',
  MEETING_CHATBOT_DELETE_RESPONSE = 'MEETING_CHATBOT_DELETE_RESPONSE',

  MEETING_AGENT_ADD_REQUEST = 'MEETING_AGENT_ADD_REQUEST',
  MEETING_AGENT_ADD_RESPONSE = 'MEETING_AGENT_ADD_RESPONSE',
  MEETING_AGENT_UPDATE_REQUEST = 'MEETING_AGENT_UPDATE_REQUEST',
  MEETING_AGENT_UPDATE_RESPONSE = 'MEETING_AGENT_UPDATE_RESPONSE',
  MEETING_AGENT_DELETE_REQUEST = 'MEETING_AGENT_DELETE_REQUEST',
  MEETING_AGENT_DELETE_RESPONSE = 'MEETING_AGENT_DELETE_RESPONSE',

  CALL_LIFECYCLE_UPDATE = 'CALL_LIFECYCLE_UPDATE',

  EMAIL_REQUEST = 'EMAIL_REQUEST',
  EMAIL_RESPONSE = 'EMAIL_RESPONSE',
}

export class RealTimeEvent<T> {
  eventName: RealTimeEventName;
  payload: T | null;

  constructor(eventName: RealTimeEventName, payload: T | null = null) {
    this.eventName = eventName;
    this.payload = payload || ({} as T);
  }

  public static of<T>(eventName: string, data: unknown): RealTimeEvent<T> | null {
    if (!data || !eventName || !this._isAcceptableEvent(eventName as RealTimeEventName)) {
      return null;
    }
    return new RealTimeEvent<T>(eventName as RealTimeEventName, data as T);
  }

  private static _isAcceptableEvent(eventName: RealTimeEventName): boolean {
    return Object.values(RealTimeEventName).includes(eventName);
  }
}
