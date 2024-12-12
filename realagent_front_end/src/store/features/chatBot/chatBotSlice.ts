import { createSlice } from '@reduxjs/toolkit';
import { ChatbotState } from './types';
import { ApiCallStatus } from '../../../services';
import ChatbotThunks from './thunks';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store/helper';

const initialState: ChatbotState = {
  status: ApiCallStatus.Idle,
  chatbots: [],
  apiKeys: [],
};

export const chatBotSlice = createSlice({
  name: 'chatBot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChatbotThunks.create.pending, createPendingHandler())
      .addCase(ChatbotThunks.create.fulfilled, createFulfilledHandler('ChatBot created successfully'))
      .addCase(ChatbotThunks.create.rejected, createRejectedHandler('Failed to create ChatBot'))

      .addCase(ChatbotThunks.findOne.pending, createPendingHandler())
      .addCase(
        ChatbotThunks.findOne.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload) {
            const chatbot = action.payload.result;
            state.chatbots = [chatbot];
          }
        }),
      )
      .addCase(ChatbotThunks.findOne.rejected, createRejectedHandler(undefined))

      .addCase(ChatbotThunks.update.pending, createPendingHandler())
      .addCase(ChatbotThunks.update.fulfilled, createFulfilledHandler('ChatBot updated successfully'))
      .addCase(ChatbotThunks.update.rejected, createRejectedHandler('Failed to update ChatBot'))

      .addCase(ChatbotThunks.remove.pending, createPendingHandler())
      .addCase(ChatbotThunks.remove.fulfilled, createFulfilledHandler('ChatBot removed successfully'))
      .addCase(ChatbotThunks.remove.rejected, createRejectedHandler('Failed to remove ChatBot'))

      .addCase(ChatbotThunks.findApiKey.pending, createPendingHandler())
      .addCase(
        ChatbotThunks.findApiKey.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload && action.payload.result) {
            const apiKey = action.payload.result;
            state.apiKeys = [apiKey];
          } else {
            state.apiKeys = [];
          }
        }),
      )
      .addCase(ChatbotThunks.findApiKey.rejected, createRejectedHandler('Failed to retrieve API key'))

      .addCase(ChatbotThunks.updateApiKey.pending, createPendingHandler())
      .addCase(
        ChatbotThunks.updateApiKey.fulfilled,
        createFulfilledHandler(
          'API key updated successfully',
          createFulfilledHandler('API key updated successfully', (state, action) => {
            state.status = ApiCallStatus.Idle;
            if (action.payload) {
              const apiKey = action.payload.result;
              state.apiKeys = [apiKey];
            }
          }),
        ),
      )
      .addCase(ChatbotThunks.updateApiKey.rejected, createRejectedHandler('Failed to update API key'));
  },
});

export default chatBotSlice.reducer;
