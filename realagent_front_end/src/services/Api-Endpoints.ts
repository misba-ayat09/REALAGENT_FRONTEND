/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/**
 * Enumeration of URL slugs for different routes or endpoints in the application.
 */
export enum Slug {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  REFRESH = '/auth/refresh',
  SERVERLOGIN = 'auth/server-login',
  CONNECTED_ACCOUNTS = '/users/connected-accounts',
  DISCONNECT_ACCOUNTS = '/users/unlink-social-media',

  ADDPARTNER = '/referral',
  GETPARTNER = '/referral',
  EDITPARTNER = '/referral',
  DELETEPARTNER = '/referral',

  USERS = '/users',
  WAITING_LIST = '/users/waiting-list',
  /**
   * reset password
   */

  VERIFY_EMAIL = '/email-verification/password/reset/send-verification-email',
  RESET_PASSWORD = '/email-verification/password/reset',

  /**
   * change password
   * */

  VERIFY_OLD_PASSWORD = '/password/validate-old-password',
  CHANGE_PASSWORD = '/password/change',

  /**
   * article
   */
  CREATEARTICLE = '/save_article',
  GENERATEARTICLE = '/generate_articles',
  GETARTICLE = '/approved_articles',
  DELETEARTICLE = '/delete_article',
  /**
   * data source
   */
  ADDTEXTDATA = '/data-source/paragraph',
  GETALLTEXTDATA = '/data-source/paragraph',
  DELETETEXTDATA = '/data-source/paragraph',
  EDITTEXTDATA = '/data-source/paragraph',
  ADDQNA = '/qa',
  GETQNA = '/qa',
  EDITQNA = '/qa',
  DELETEQNA = '/qa',
  ADDWEBSITE = '/url',
  GETWEBSITE = '/urls',
  EDITWEBSITE = '/urls',
  DELETEWEBSITE = '/delete-url',
  // GCP FILE UPLOAD
  UPLOADFILE = '/file/upload',
  FILE = '/file',

  // DATASOURCE FILE CRUD

  DS_FILE = '/data-source/file',

  //fetch Data source

  FETCH_DATA_SOURCE = '/fetch_datasource',

  /**
   * CHAT HISTORY
   **/
  ADDENTRY = '/add_entry',
  LISTUSERS = '/list_unique_users',
  LISTHISTORY = '/list_history',
  EXPORT_CONVERSATION = '/export_conversation',
  /**
   * MEETING
   **/
  MEETINGS = '/meeting',
  GENERATETOKEN = '/meeting/generateToken',
  PROCESS_TRANSCRIPTION = '/meeting/process/transcript',
  GETALLMEETINGS = '/meeting',
  ADDNEWMEETING = '/meeting',
  DELETEMEETING = '/meeting',
  EDITMEETING = '/meeting',

  /**
   * Research Agent
   **/
  GET_RESEARCH_AGENT_TOPIC = '/research/topic',
  ADD_RESEARCH_AGENT_TOPIC = '/research/topic',
  DELETE_RESEARCH_AGENT_TOPIC = '/research/topic',
  RESEARCH_AGENT_ARTICLE = '/research/article',
  DELETE_RESEARCH_AGENT_ARTICLE = '/research/article',

  /**
   * CHAT
   **/
  GENERATE_SUMMARIES = '/chat-bot/history/generate-summaries',
  GETALLCHAT = '/chat-bot/history',
  ADDCHAT = '/chat-bot/history',
  /**
   * CHATBOT
   **/
  CHATBOT = '/chat-bot',
  /**
   * CHAT
     /**
   * CHAT
   **/
  DS_PARAGRAPH = '/data-source/paragraph',
  DS = '/data-source/paragraph',

  /**
   * question answer
   **/
  DS_QNA = '/data-source/question-answer',

  /**
   * WEBSITE
   **/
  DS_WEBSITE = '/data-source/url',

  /**
   * qualifying question
   **/
  DS_QQ = 'data-source/qualifying-question',

  SOCIAL_MEDIA = '/social-media',
  ADDSOCIALMEDIAPOST = '/social-media/send-post',
  CONVERT_ARTICLE_TO_POST = '/social-media-content/generate-post',
  ADDTWITTER = '/auth/twitter/tweet',

  ADD_SOCIAL_MEDIA_CONTENT = '/social-media-content/generate',
  SOCIAL_MEDIA_CONTENT = '/social-media-content',

  GETALLDASHBOARDDETAILS = '/dashboard',
  REGENERATE_SOCIAL_MEDIA_CONTENT = '/social-media-content/regenerate',

  USER_CHATBOT = '/user-chat-bot/history',
  QA_CHATBOT = '/qna-assistant/history',
  CALENDAR = '/meeting/calendar-data',

  /***
   * EMAIL AGENT
   */
  SEND_EMAIL = '/mail/send',
  PROCESS_MAIL = '/mail/process',
  GET_INBOX = '/mail/inbox',
  GET_MAIL = '/mail/message',
  /***
   * AI EMAIL AGENT SERVICE
   */
  GENERATE_AI_EMAIL = '/generate-email-template/',
  PROCESS_EMAILS = '/process-emails',

  /**
   * API KEYS
   */
  SAVE_AS_DRAFT = '/mail/draft',
  SIGNATURE = '/mail/signature',

  GETAVAILABLENUMBER = '/twilio-media-stream/available-number',
  GETALLCALLS = '/twilio-media-stream/call/log/list',
  ADDTWILIONUMBER = '/twilio-media-stream/createTwilioNumber',
  GETSAVEDNUMBER = '/twilio-media-stream/configuration/twilio',
  GETVOICE = '/twilio-media-stream/voice',
  GENERATE_AI_SCRIPT = '/twilio-media-stream/call/script',
  CREATEVOICE = '/twilio-media-stream/voice',
  GETVOICECONFIG = '/twilio-media-stream/configuration/voice',
  MAKECALL = '/twilio-media-stream/makecall',
  UPDATEVOICE = '/twilio-media-stream/voice',
  REMOVENUMBER = '/twilio-media-stream/removeNumber',

  TWILLIOCONFIG = '/twilio-media-stream/configuration/twilio',

  ADDCONTACT = '/contact',
  GETALLCONTACT = '/contact',
  IMPORTCONTACT = '/contact/upload',
  DELETECONTACT = '/contact',
  UPDATECONTACT = '/contact',
  SCHEDULECALL = '/contact/schedule',
  ADDCAMPAIGN = '/campaigns',
  GETALLCAMPAIGN = '/campaigns',
  DELETECAMPAIGN = '/campaigns',
  UPDATECAMPAIGN = '/campaigns',
  ADDPROFILE = '/profile',

  APIKEY = '/api-key',

  ADDGROUP = '/groups',
  GETALLGROUP = '/groups',
  DELETEGROUP = '/groups',
  UPDATEGROUP = '/groups',

  ADDCAMPAIGNEVENTS = '/campaign-events',
  GETALLCAMPAIGNEVENTS = '/campaign-events',
  DELETECAMPAIGNEVENTS = '/campaign-events',
  UPDATECAMPAIGNEVENTS = '/campaign-events',

  ACTIVITY = '/activity',
  /**
  Notification 
 */
  NOTIFICATIONS = '/notifications',
  GETNOTIFICATIONS = '/notifications/one',
  NOTIFICATIONSCOUNT = '/notifications/counts',
  NOTIFICATIONMARKASREAD = '/notifications/read-all',
  NOTIFICATIONSCLEAR = '/notifications',

  ADD_QA_ASSISTANT = '/qa_assistant/',
  INCHAT = '/inchat/',
  GET_QA = '/get_qa',

  POSTRESEARCH = '/generate_blog/',

  SOCIALMEDIABRANDING = '/social-media-branding',

  TEMPLATEGENERATION = '/social-media-branding/generate-template',

  AYRSHARE_CONNECT = '/ayrshare/connect',
  AYRSHARE_DISCONNECT = '/ayrshare/disconnect',
  AYRSHARE_PROFILE = '/ayrshare/profile',
  AYRSHARE_POST = '/ayrshare/post',
  AYRSHARE_POSTS = '/ayrshare/posts',
  AYRSHARE_CONNECTED_ACCOUNT = '/ayrshare/connected-accounts',
  AYRSHARE_ACTIVITIES = '/ayrshare/activities',

  CONVERSATION_FLOW = 'conversation-flow',

  ADD_AI_aGENT = '/ai-agent',
  GET_AI_aGENT = '/ai-agent',
  UPDATE_AI_aGENT = '/ai-agent',
  DELETE_AI_aGENT = '/ai-agent',
}
