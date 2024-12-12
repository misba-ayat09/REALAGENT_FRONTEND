// Export other utility functions.
export * from './storage';

// Export other utility functions.
export * from './storage';
export * from './dateUtils';
export * from './compareServerTime';
export * from './utils';
export * from './scaler';
export * from './logger';
export * from './validationUtils';
export * from './file-download';
/**
 * Enum representing storage keys used in the application.
 * @enum {string}
 */
export enum StorageKeys {
  /**
   * Key for storing user data.
   */
  USERDATA = '@UserData',

  /**
   * Key for storing authentication token.
   */
  TOKEN = '@Token',
  //  user authentication status
  AUTHSTATUS = '@AuthStatus',

  // refesh token for current user
  REFRESH = '@Refresh',
  /*
    fileName of files uploaded
  */
  UPLOADED_FILENAMES = '@UploadedFileNames',
  /*
    feedback names
  */
  FEEDBACK = '@FeedBack',
  /*
    feedbacks
 */
  NOTESATTACHMENT = '@NotesAttachment',

  USERAUTHDATA = '@UserAuthData',
}
