import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
  DashboardScreen,
  ErrorScreen,
  ResearchHomeScreen,
  ResearchFavouriteScreen,
  CalendarScreen,
  ActivityScreen,
  ActivitiesChat,
  EmbedSettingsScreen,
  DataSourceScreen,
} from '../pages';
import { PATH_PAGES } from './route';
import { AgentLayout, MainLayout } from '../layout';
import SocialMediaAgent from '../pages/SocialMedia/SocialMediaAgent';
import SocialMediaActivitiesScreen from '../pages/SocialMedia/SocialMediaActivitiesScreen';
import AccountScreen from '../pages/AccountScreen';
import SettingScreen from '../pages/SettingScreen/Settings/settings';
import HelpScreen from '../pages/SettingScreen/Help/help';
import MeetingRoomScreen from '../pages/WebsiteAgent/MeetingRoomScreen';
import PhoneHomeScreen from '../pages/PhoneAgent/PhoneHome';
import ChangePassword from '../components/Settings/General/ChangepasswordCard';
import ConfirmPassword from '../components/Settings/General/ConfirmPassword';
import NotificationScreen from '../pages/Notification/Notification';
import NothingFoundScreen from '../pages/ErrorScreen/NothingFoundScreen';
import BotViewer from '../pages/BotViewerScreen/BotViewer';
import CrmHome from '../pages/CrmAgent/Home';
import CrmContact from '../pages/CrmAgent/Contact';
import { BrandSetupScreen, TemplateGenerationScreen } from '../pages/SocialMedia';
import { ComposeScreen, InboxScreen, SendScreen, DraftScreen, ConfigureScreen } from '../pages/EmailAgent';
import BotsSetup from '../pages/DashboardScreen/BotsSetup/BotsSetup';
import CampaignScreen from '../pages/ColdCallBot/Campaign/CompaignScreen';
import ColdCallHome from '../pages/ColdCallBot/ColdCallHome';
import CampaignDetailsCard from '../components/PhoneContactCard/campaignDetailsCard';
import AccountSettings from '../pages/ColdCallBot/AccountSettings/AccountSettings';
import ContactScreen from '../pages/PhoneAgent/Contact';
import ProfileScreen from '../pages/PhoneAgent/Profile';
import ContentCalender from '../pages/ContentCalender/ContentCalender';
import Calendar from '../pages/ContentCalender/calender';


const ProtectedRoutes: React.FC = () => {
  const protectedRoutesElement = useRoutes([
    {
      element: <AgentLayout />,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: '/',
          element: <Navigate to={PATH_PAGES.dashboardHome} replace />,
        },
        {
          children: [
            {
              path: PATH_PAGES.dashboardHome,
              element: <DashboardScreen />,
            },
            
            {
              path: PATH_PAGES.dashboardBots,
              element: <BotsSetup />,
            },

            {
              path: PATH_PAGES.account,
              element: <AccountScreen />,
            },
            {
              path: PATH_PAGES.setting,
              element: <SettingScreen />,
            },
            {
              path: PATH_PAGES.help,
              element: <HelpScreen />,
            },
            {
              path: PATH_PAGES.calendar,
              element: <CalendarScreen />,
            },
            {
              path: PATH_PAGES.botViewer,
              element: <BotViewer />,
            },
            {
              path: PATH_PAGES.notifications,
              element: <NotificationScreen />,
            },
          ],
        },
        {
          children: [
            // {
            //   path: PATH_PAGES.meet,
            //   element: <MeetingScreen />,
            // },
            {
              path: PATH_PAGES.websiteActivities,
              element: <ActivityScreen />,
            },
            {
              path: PATH_PAGES.websiteActivitiesChat,
              element: <ActivitiesChat />,
            },
            {
              path: PATH_PAGES.dataSource,
              element: <DataSourceScreen />,
            },
            {
              path: PATH_PAGES.embedSettings,
              element: <EmbedSettingsScreen />,
            },
            {
              path: PATH_PAGES.changepassword,
              element: <ChangePassword />,
            },
            {
              path: PATH_PAGES.confirmPassword,
              element: <ConfirmPassword />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.publish,
              element: <SocialMediaAgent />,
            },
            {
              path: PATH_PAGES.socialMediaActivities,
              element: <SocialMediaActivitiesScreen />,
            },
            {
              path: PATH_PAGES.brandSetup,
              element: <BrandSetupScreen />,
            },
            {
              path: PATH_PAGES.templateGenerator,
              element: <TemplateGenerationScreen />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.researchHome,
              element: <ResearchHomeScreen />,
            },
            {
              path: PATH_PAGES.favourite,
              element: <ResearchFavouriteScreen />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.emailHome,
              element: <ComposeScreen />,
            },
            {
              path: PATH_PAGES.inbox,
              element: <InboxScreen />,
            },
            {
              path: PATH_PAGES.send,
              element: <SendScreen />,
            },
            {
              path: PATH_PAGES.draft,
              element: <DraftScreen />,
            },
            {
              path: PATH_PAGES.configure,
              element: <ConfigureScreen />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.coldCallHome,
              element: <ColdCallHome />,
            },
            {
              path: PATH_PAGES.campaign,
              element: <CampaignScreen />,
            },
            {
              path: PATH_PAGES.campaignDetails,
              element: <CampaignDetailsCard campaignId={''} />,
            },
            {
              path: PATH_PAGES.accountSettings,
              element: <AccountSettings />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.crmHome,
              element: <CrmHome />,
            },
            {
              path: PATH_PAGES.crmContactView,
              element: <CrmContact />,
            },
          ],
        },
        {
          children: [
            {
              path: PATH_PAGES.receptionistHome,
              element: <PhoneHomeScreen />,
            },
            {
              path: PATH_PAGES.contact,
              element: <ContactScreen />,
            },
            {
              path: PATH_PAGES.accountsettings,
              element: <ProfileScreen />,
            },
          ],
        },
        {
          path: PATH_PAGES.Activity,
          element: <ContentCalender />,
        },
      ],
    },

    {
      element: <MainLayout />,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: PATH_PAGES.nothingfound,
          element: <NothingFoundScreen />,
        },
        {
          element: <MeetingRoomScreen />,
          path: PATH_PAGES.meetRoom,
        },
      ],
    },
  ]);

  return <>{protectedRoutesElement}</>;
};

export default ProtectedRoutes;
