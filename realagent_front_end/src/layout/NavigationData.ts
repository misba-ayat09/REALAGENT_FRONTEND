import { AgentType } from '../common/enum/agent.enum';
import { NavigationDataType } from '../components/Navigation';
import { NavigationIconType } from '../components/Navigation/NavigationIcon';
import { PATH_PAGES } from '../router/route';
export const NavigationData: { [key in AgentType]: NavigationDataType[] } = {
  [AgentType.Dashboard]: [
    {
      title: 'Discover',
      links: [
        // {
        //   label: 'Bot Viewer',
        //   icon: NavigationIconType.BotViewer,
        //   link: PATH_PAGES.botViewer,
        //   strokeWidth: 0,
        // },
        {
          label: 'Timeline',
          icon: NavigationIconType.Home,
          link: PATH_PAGES.dashboardHome,
        },
        {
          label: 'Calendar',
          icon: NavigationIconType.Calendar,
          link: PATH_PAGES.calendar,
        },
        {
          label: 'Account',
          icon: NavigationIconType.Account,
          link: PATH_PAGES.account,
        },
      ],
    },
  ],
  [AgentType.Website]: [
    {
      title: 'Discover',
      links: [
        // {
        //   label: 'Meet',
        //   icon: NavigationIconType.Meet,
        //   link: PATH_PAGES.meet,
        // },
        {
          label: 'Activities',
          icon: NavigationIconType.Activity,
          link: PATH_PAGES.websiteActivities,
        },
        {
          label: 'Data Source',
          icon: NavigationIconType.DataSource,
          link: PATH_PAGES.dataSource,
        },
        {
          label: 'Embed Settings',
          icon: NavigationIconType.EmbedSettings,
          link: PATH_PAGES.embedSettings,
        },
      ],
    },
  ],
  [AgentType.SocialMedia]: [
    {
      title: 'Discover',
      links: [
        {
          label: 'Publish',
          icon: NavigationIconType.Publish,
          link: PATH_PAGES.publish,
        },
        {
          label: 'Activities',
          icon: NavigationIconType.Activity,
          link: PATH_PAGES.socialMediaActivities,
        },
        {
          label: 'Brand Setup',
          icon: NavigationIconType.Brand,
          link: PATH_PAGES.brandSetup,
        },
        {
          label: 'Poster Generator',
          icon: NavigationIconType.Poster,
          link: PATH_PAGES.templateGenerator,
        },
      ],
    },
  ],
  [AgentType.ContentCalender]: [
    {
      title: 'Discover',
      links: [
        {
          label: 'Publish',
          icon: NavigationIconType.Publish,
          link: PATH_PAGES.publish,
        },
        {
          label: 'Activities',
          icon: NavigationIconType.Activity,
          link: PATH_PAGES.socialMediaActivities,
        },
        {
          label: 'Brand Setup',
          icon: NavigationIconType.Brand,
          link: PATH_PAGES.brandSetup,
        },
        {
          label: 'Poster Generator',
          icon: NavigationIconType.Poster,
          link: PATH_PAGES.templateGenerator,
        },
      ],
    },
  ],
  [AgentType.Research]: [
    {
      title: 'Discover',
      links: [
        {
          label: 'Home',
          icon: NavigationIconType.Home,
          link: PATH_PAGES.researchHome,
        },
        {
          label: 'Setup',
          icon: NavigationIconType.Favourite,
          link: PATH_PAGES.favourite,
        },
      ],
    },
  ],
  [AgentType.Email]: [
    {
      title: 'Email',
      links: [
        {
          label: 'Compose',
          icon: NavigationIconType.Compose,
          link: PATH_PAGES.emailHome,
          strokeWidth: 0.1,
        },
        {
          label: 'Inbox',
          icon: NavigationIconType.Inbox,
          link: PATH_PAGES.inbox,
          strokeWidth: 0.1,
        },
        {
          label: 'Sent',
          icon: NavigationIconType.Send,
          link: PATH_PAGES.send,
          strokeWidth: 0.1,
        },
        {
          label: 'Draft',
          icon: NavigationIconType.Draft,
          link: PATH_PAGES.draft,
          strokeWidth: 0.1,
        },
        {
          label: 'Configure',
          icon: NavigationIconType.Configure,
          link: PATH_PAGES.configure,
          strokeWidth: 0.1,
        },
      ],
    },
  ],
  // [AgentType.ColdCalling]: [
  //   {
  //     title: 'Phone',
  //     links: [
  //       {
  //         label: 'Home',
  //         icon: NavigationIconType.Home,
  //         link: PATH_PAGES.coldCallHome,
  //       },
  //       {
  //         label: 'Contact',
  //         icon: NavigationIconType.Contact,
  //         link: PATH_PAGES.contact,
  //       },
  //       {
  //         label: 'Settings',
  //         icon: NavigationIconType.Account,
  //         link: PATH_PAGES.profile,
  //       },
  //       {
  //         label: 'Schedule',
  //         icon: NavigationIconType.Activities,
  //         link: PATH_PAGES.schedule,
  //       },
  //     ],
  //   },
  // ],
  [AgentType.Crm]: [
    {
      title: 'Discover',
      links: [
        {
          label: 'Home',
          icon: NavigationIconType.Home,
          link: PATH_PAGES.crmHome,
        },
      ],
    },
  ],
  [AgentType.ColdCalling]: [
    {
      title: 'Discover',
      links: [
        // {
        //   label: 'Home',
        //   icon: NavigationIconType.Home,
        //   link: PATH_PAGES.coldCallHome,
        // },
        {
          label: 'Campaigns',
          icon: NavigationIconType.Contact,
          link: PATH_PAGES.campaign,
          // secondaryLink: PATH_PAGES.campaignDetails,
        },
        {
          label: 'Account Settings',
          icon: NavigationIconType.Account,
          link: PATH_PAGES.accountSettings,
        },
      ],
    },
  ],
  [AgentType.Receptionist]: [
    {
      title: 'Discover',
      links: [
        {
          label: 'Home',
          icon: NavigationIconType.Home,
          link: PATH_PAGES.receptionistHome,
        },
        {
          label: 'Contact',
          icon: NavigationIconType.Contact,
          link: PATH_PAGES.contact,
        },
        {
          label: 'Account Settings',
          icon: NavigationIconType.Account,
          link: PATH_PAGES.accountsettings,
        },
      ],
    },
  ],
};
