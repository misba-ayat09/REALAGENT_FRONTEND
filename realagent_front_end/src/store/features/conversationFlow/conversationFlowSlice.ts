import { createSlice } from '@reduxjs/toolkit';
import { ConversationFlowState } from './types';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';
import ConversationFlowThunks from './thunks';
import { ApiCallStatus } from '../../../services';

const initialState: ConversationFlowState = {
  status: ApiCallStatus.Idle,
  conversationFlowData: undefined,
};

export const conversationFlowSlice = createSlice({
  name: 'ConversationFlow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ConversationFlowThunks.create.pending, createPendingHandler())
      .addCase(ConversationFlowThunks.create.fulfilled, createFulfilledHandler())
      .addCase(ConversationFlowThunks.create.rejected, createRejectedHandler())

      .addCase(ConversationFlowThunks.find.pending, createPendingHandler())
      .addCase(
        ConversationFlowThunks.find.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          state.status = ApiCallStatus.Idle;
          if (action.payload) {
            const conversationFlowData = action.payload.result;
            state.conversationFlowData = conversationFlowData;
          }
        }),
      )
      .addCase(ConversationFlowThunks.find.rejected, createRejectedHandler())

      .addCase(ConversationFlowThunks.update.pending, createPendingHandler())
      .addCase(ConversationFlowThunks.update.fulfilled, createFulfilledHandler())
      .addCase(ConversationFlowThunks.update.rejected, createRejectedHandler())

      .addCase(ConversationFlowThunks.remove.pending, createPendingHandler())
      .addCase(ConversationFlowThunks.remove.fulfilled, createFulfilledHandler())
      .addCase(ConversationFlowThunks.remove.rejected, createRejectedHandler());
  },
});

export default conversationFlowSlice.reducer;
