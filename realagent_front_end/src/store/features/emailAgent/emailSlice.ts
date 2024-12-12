import { createSlice } from '@reduxjs/toolkit';
import { EmailAgentState } from './types';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';
import EmailThunks from './thunks';
import { ApiCallStatus } from '../../../services';
import { EmailLabel } from '../../../common/enum/email-label.enum';

const initialState: EmailAgentState = {
  status: ApiCallStatus.Idle,
  emails: {},
};

export const emailSlice = createSlice({
  name: 'Email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EmailThunks.sendEmail.pending, createPendingHandler())
      .addCase(EmailThunks.sendEmail.fulfilled, createFulfilledHandler('Email sent successfully'))
      .addCase(EmailThunks.sendEmail.rejected, createRejectedHandler('Failed to send email'))

      .addCase(EmailThunks.getImportant.pending, createPendingHandler())
      .addCase(
        EmailThunks.getImportant.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.IMPORTANT]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getImportant.rejected, createRejectedHandler('Failed to get important emails'))

      .addCase(EmailThunks.getSpam.pending, createPendingHandler())
      .addCase(
        EmailThunks.getSpam.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.SPAM]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getSpam.rejected, createRejectedHandler('Failed to get spam emails'))

      .addCase(EmailThunks.getEnquiry.pending, createPendingHandler())
      .addCase(
        EmailThunks.getEnquiry.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.CATEGORY_REAL_ESTATE_ENQUIRY]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getEnquiry.rejected, createRejectedHandler('Failed to get enquiry emails'))

      .addCase(EmailThunks.getMeeting.pending, createPendingHandler())
      .addCase(
        EmailThunks.getMeeting.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.CATEGORY_REAL_ESTATE_MEETING]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getMeeting.rejected, createRejectedHandler('Failed to get meeting emails'))

      .addCase(EmailThunks.getOther.pending, createPendingHandler())
      .addCase(
        EmailThunks.getOther.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.CATEGORY_REAL_ESTATE_OTHER]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getOther.rejected, createRejectedHandler('Failed to get other emails'))

      .addCase(EmailThunks.getSent.pending, createPendingHandler())
      .addCase(
        EmailThunks.getSent.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.SENT]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getSent.rejected, createRejectedHandler('Failed to get sent emails'))

      .addCase(EmailThunks.getDraft.pending, createPendingHandler())
      .addCase(
        EmailThunks.getDraft.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.emails = {
              [EmailLabel.DRAFT]: data,
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(EmailThunks.getDraft.rejected, createRejectedHandler('Failed to get draft emails'));
  },
});

export default emailSlice.reducer;
