/* Instruments */

import { contactReducer } from '../features/AddContact';
import { dataSourceReducer } from '../features/DataSources';
import { phoneReducer } from '../features/ReceptionistAgent';
import { profileReducer } from '../features/Profile';
import { authenticationReducer } from '../features/authentication';
import { calendarReducer } from '../features/calendar';
import { chatReducer } from '../features/chat';
import { chatBotReducer } from '../features/chatBot';
import { dashboardAgentReducer } from '../features/dashboardAgent';
import { fileHubReducer } from '../features/fileHub';
import { meetingReducer } from '../features/meetings';
import { researchAgentReducer } from '../features/researchAgent';
import { socialMediaAgentReducer } from '../features/socialMediaAgent';
import { socialMediaContentReducer } from '../features/socialMediaAgent/social-media-content';
import { userChatBotReducer } from '../features/userChatBot';
import { emailReducer } from '../features/emailAgent';
import { activityReducer } from '../features/activities';
import { notificationReducer } from '../features/notification';
import { fullScreenChatBotReducer } from '../features/fullScreenChatBot';
import { qaChatBotReducer } from '../features/qaChatbot';
import { aiAgentsReducer } from '../features/aiAgents';
import { coldCallBotReducer } from '../features/ColdCallBot';
import { campaignReducer } from '../features/AddCampaign';
import { groupReducer } from '../features/AddGroups';
import { campaignEventReducer } from '../features/CampaignEvent';

export const reducer = {
  authentication: authenticationReducer,
  fileHub: fileHubReducer,
  meeting: meetingReducer,
  dataSources: dataSourceReducer,
  researchAgent: researchAgentReducer,
  chat: chatReducer,
  socialMediaAgent: socialMediaAgentReducer,
  chatBot: chatBotReducer,
  socialMediaContent: socialMediaContentReducer,
  publishedContent: socialMediaContentReducer,
  dashboardAgent: dashboardAgentReducer,
  userChatBot: userChatBotReducer,
  qaChatBot: qaChatBotReducer,
  calendar: calendarReducer,
  email: emailReducer,
  phoneAgent: phoneReducer,
  coldCallBot: coldCallBotReducer,
  contact: contactReducer,
  campaign: campaignReducer,
  campaignEvents: campaignEventReducer,
  groups: groupReducer,
  profile: profileReducer,
  activity: activityReducer,
  notification: notificationReducer,
  fullScreenChatBot: fullScreenChatBotReducer,
  aiAgents: aiAgentsReducer,
};
