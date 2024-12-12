import { ChatBotUsers } from "../../../common/enum";

export interface Message {
  id: number;
  text: string;
  user: ChatBotUsers;
}
