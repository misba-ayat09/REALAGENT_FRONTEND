import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ServerFormResult,
  serverLoginAPI,
  ServerLoginFormData,
} from "./serverLoginAPI";
import { toast } from "sonner";

interface InitialState {
  status: string;
  result: ServerFormResult;
}

const initialState: InitialState = {
  status: "idle",
  result: {
    userId: "",
    emailId: "",
    isInWaitingList: false,
    token: "",
    refreshToken: "",
  },
};

export const serverlogin = createAsyncThunk(
  "authentication/login",
  async (formData: ServerLoginFormData, thunkAPI) => {
    try {
      const response = await serverLoginAPI.serverlogin(formData);
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const serverLoginSlice = createSlice({
  name: "serverlogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(serverlogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(serverlogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload as ServerFormResult;
      });

    builder.addCase(serverlogin.rejected, (state) => {
      state.status = "failed";
      toast.error("Failed to generte token. Please try again");
    });
  },
});

export default serverLoginSlice.reducer;
