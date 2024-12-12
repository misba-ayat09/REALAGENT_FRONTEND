import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Config } from "../../../config";
import { QaList } from "./chatBotAPI";

interface InitialState {
  status: string;
  question_answers: QaList[];
}

const initialState: InitialState = {
  status: "idle",
  question_answers: [],
};

export const getChat = createAsyncThunk(
  "getChat",
  async (user_id: string, thunkAPI) => {
    try {
      const url = `${Config.BOT_CHAT_URL}/get_qa/${user_id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": "7B9X-F2H5-R8M1-T6P3",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data?.question_answers ?? "Sorry, I couldn't understand your request.";
    } catch (error: unknown) {
      console.error("Error fetching chat data:", error);
      return thunkAPI.rejectWithValue("Sorry, there was an error fetching the data.");
    }
  }
);
export const fullScreenChatBotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChat.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "idle";
          state.question_answers = action.payload
        }
      })
      .addCase(getChat.rejected, (state) => {
        state.status = "failed";
      });
},
});

export default fullScreenChatBotSlice.reducer;
