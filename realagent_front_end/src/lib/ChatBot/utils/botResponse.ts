import { Config } from "../../../config";
import { QustionList } from "../../../store/features/fullScreenChatBot";

export const generateBotResponse = async (input: string, id: string): Promise<string> => {
  const url = `${Config.BOT_CHAT_URL}/inchat/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "7B9X-F2H5-R8M1-T6P3",
      },
      body: JSON.stringify({
        user_id: id,
        user_message: input,
      }),
    });

    const data = await response.json();
    return data?.response ?? "Sorry, I couldn't understand your request.";
  } catch (error) {
    console.error('Failed to fetch bot response:', error);
    return "There was an issue processing your request.";
  }
};
export const addQAassistant = async (
  userinput: string,
  id: string,
  username: string
): Promise<QustionList | null> => {
  const url = `${Config.BOT_CHAT_URL}/qa_assistant/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "7B9X-F2H5-R8M1-T6P3",
      },
      body: JSON.stringify({
        user_id: id,
        username: username,
        user_input: userinput,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch bot response:', error);
    return null;
  }
};
