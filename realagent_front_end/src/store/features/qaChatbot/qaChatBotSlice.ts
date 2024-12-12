/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { VersionState } from './types';
import { getQaChatBotHistory, addToQaChatBotHistory } from './thunks';
import { ApiCallStatus } from '../../../services';
import { ChatBotUsers } from '../../../common/enum';

const initialState: VersionState = {
  status: ApiCallStatus.Idle,
  conversations: [],
};

export const qaChatBotSlice = createSlice({
  name: 'qaChatBot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getUserChatBotHistory
      .addCase(getQaChatBotHistory.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(getQaChatBotHistory.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        conversations: action.payload?.result?.messages ?? [
          {
            timestamp: Date.now(),
            text: 'Hi there! How can I assist you today?',
            user: ChatBotUsers.BOT,
          },
        ],
      }))
      .addCase(getQaChatBotHistory.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // addToUserChatBotHistory
      .addCase(addToQaChatBotHistory.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(addToQaChatBotHistory.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        conversations: action.payload?.result?.messages ?? [],
      }))
      .addCase(addToQaChatBotHistory.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }));
  },
});

export default qaChatBotSlice.reducer;
