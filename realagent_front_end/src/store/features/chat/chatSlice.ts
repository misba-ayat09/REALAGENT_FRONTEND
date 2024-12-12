import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Results, chatAPI } from "./chatAPI";
interface InitialState {
  status: string;
  result:Results[];
}

const initialState: InitialState = {
  status: "idle",
  result: [],
};

export const getallChat = createAsyncThunk(
  "getallChat",
  async (_, thunkAPI) => {
    try {
      const response = await chatAPI.getAllChat();
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
export const chatSlice = createSlice({
  name: "getallChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallChat.pending, () => {})
      .addCase(getallChat.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = action.payload.status;
          state.result = action.payload.result;
        }
      });
  },
});

export default chatSlice.reducer;
