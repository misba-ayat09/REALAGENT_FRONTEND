import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserChatBotState } from './types';
import UserChatbotThunks from './thunks';
import { ApiCallStatus } from '../../../services';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';

const initialState: UserChatBotState = {
  status: ApiCallStatus.Idle,
  isQACompleted: false,
  conversations: [],
  questionAnswers: [],
};

export const userChatBotSlice = createSlice({
  name: 'UserChatBot',
  initialState,
  reducers: {
    setIsQACompleted: (state, action: PayloadAction<boolean>) => {
      state.isQACompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserChatbotThunks.addToUserChatBotHistory.pending, createPendingHandler())
      .addCase(
        UserChatbotThunks.addToUserChatBotHistory.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload?.result?.messages) {
            state.conversations = action.payload.result.messages;
          }
        }),
      )
      .addCase(UserChatbotThunks.addToUserChatBotHistory.rejected, createRejectedHandler(undefined))
      .addCase(UserChatbotThunks.getChatHistory.pending, createPendingHandler())
      .addCase(
        UserChatbotThunks.getChatHistory.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload?.result?.messages) {
            state.conversations = action.payload.result.messages;
          }
        }),
      )
      .addCase(UserChatbotThunks.getChatHistory.rejected, createRejectedHandler(undefined))
      .addCase(UserChatbotThunks.getAllQuestionAnswers.pending, createPendingHandler())
      .addCase(
        UserChatbotThunks.getAllQuestionAnswers.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload) {
            state.questionAnswers = action.payload;
          }
        }),
      )
      .addCase(UserChatbotThunks.getAllQuestionAnswers.rejected, createRejectedHandler(undefined));
  },
});

export default userChatBotSlice.reducer;

export const userChatBotActions = userChatBotSlice.actions;
