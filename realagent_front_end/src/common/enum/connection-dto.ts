import { RealTimeEventName } from '../../socket';

export class ChatEvent {
  public eventName: RealTimeEventName;

  constructor(eventName: RealTimeEventName) {
    this.eventName = eventName;
  }
}

export class ConnectionEstablishedServerEvent {
  public constructor(readonly messsage: string) {}
}

export class MeetingChatbotAddRequestEvent extends ChatEvent {
  private constructor(public readonly messsage: string) {
    super(RealTimeEventName.MEETING_CHATBOT_ADD_REQUEST);
  }

  public static of(id: string): MeetingChatbotAddRequestEvent {
    return new MeetingChatbotAddRequestEvent(id);
  }
}

export class MeetingChatbotAddResponseEvent extends ChatEvent {
  private constructor(public readonly id: string) {
    super(RealTimeEventName.MEETING_CHATBOT_ADD_RESPONSE);
  }

  public static of(id: string): MeetingChatbotAddResponseEvent {
    return new MeetingChatbotAddResponseEvent(id);
  }
}

export class MeetingAgentAddRequestEvent extends ChatEvent {
  private constructor(public readonly id: string) {
    super(RealTimeEventName.MEETING_AGENT_ADD_REQUEST);
  }

  public static of(id: string): MeetingAgentAddRequestEvent {
    return new MeetingAgentAddRequestEvent(id);
  }
}

export class MeetingAgentAddResponseEvent extends ChatEvent {
  private constructor(public readonly id: string) {
    super(RealTimeEventName.MEETING_AGENT_ADD_RESPONSE);
  }

  public static of(id: string): MeetingAgentAddResponseEvent {
    return new MeetingAgentAddResponseEvent(id);
  }
}
