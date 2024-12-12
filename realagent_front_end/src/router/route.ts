import { AgentType } from '../common/enum/agent.enum';

class BasePath {
  constructor(protected root: string) {
    this.root = this.root.replace(/^\/|\/$/g, '');
  }

  getPath(...sublinks: (string | { param: string })[]): string {
    const sanitizedSublinks = sublinks.map((sublink) =>
      typeof sublink === 'string' ? sublink.replace(/^\/|\/$/g, '') : `:${sublink.param}`,
    );
    const fullPath = [this.root, ...sanitizedSublinks].join('/');
    return fullPath.startsWith('/') ? fullPath : `/${fullPath}`;
  }

  belongsToPath(path: string): boolean {
    const sanitizedPath = path.replace(/^\/|\/$/g, '');
    return sanitizedPath === this.root || sanitizedPath.startsWith(`${this.root}/`);
  }
}

class PathAuth extends BasePath {
  constructor() {
    super('');
  }

  signIn = this.getPath('signin');
  signUp = this.getPath('signup');
  forgotPassword = this.getPath('forgot-password');
  resetPassword = this.getPath('reset-password');
}

class PathDashboard extends BasePath {
  constructor() {
    super('dashboard');
  }

  dashboardHome = this.getPath('home');
  dashboardBots = this.getPath('bots-setup');
  botViewer = this.getPath('bot-viewer');
  calendar = this.getPath('calendar');
  account = this.getPath('account');
  setting = this.getPath('settings');
  notifications = this.getPath('notifications');
  help = this.getPath('help');
  changepassword = this.getPath('changepassword');
  confirmPassword = this.getPath('confirmPassword');
  nothingfound = this.getPath('nothingfound');
}

class PathWebsite extends BasePath {
  constructor() {
    super('website');
  }

  meet = this.getPath('meet');
  websiteActivities = this.getPath('activities');
  websiteActivitiesChat = this.getPath('activities/chat');
  meetRoom = this.getPath('meetroom', { param: 'roomId' });
  dataSource = this.getPath('datasource');
  embedSettings = this.getPath('embedSettings');

  isMeetRoute(route: string): boolean {
    return route.startsWith(this.getPath('meetroom') + '/');
  }

  getMeetRoomRoute(roomId: string) {
    return this.getPath('meetroom', `${roomId}`);
  }
}

class PathSocialMedia extends BasePath {
  constructor() {
    super('social-media');
  }

  publish = this.getPath('Publish');
  socialMediaActivities = this.getPath('activities');
  brandSetup = this.getPath('brandSetup');
  templateGenerator = this.getPath('templateGenerator');
}

class PathResearch extends BasePath {
  constructor() {
    super('research');
  }

  researchHome = this.getPath('home');
  favourite = this.getPath('favourite');
}
class PathReceptionist extends BasePath {
  constructor() {
    super('receptionist');
  }
  receptionistHome = this.getPath('home');
  contact = this.getPath('contact');
  accountsettings = this.getPath('accountsettings');
}

class PathColdCall extends BasePath {
  constructor() {
    super('coldcall');
  }
  coldCallHome = this.getPath('home');
  campaign = this.getPath('campaign');
  campaignDetails = this.getPath('campaigndetails');
  accountSettings = this.getPath('accountSettings');
}

class PathPublic extends BasePath {
  constructor() {
    super('public');
  }

  ContentCalender = this.getPath('contentcalender');
}

class PathEmail extends BasePath {
  constructor() {
    super('email');
  }

  emailHome = this.getPath('home');
  send = this.getPath('send');
  draft = this.getPath('draft');
  configure = this.getPath('configure');
  inbox = this.getPath('inbox');
}

class PathCRM extends BasePath {
  constructor() {
    super('crm');
  }

  crmHome = this.getPath('home');
  crmContactView = this.getPath('contact');
}



class PathContentCalender extends BasePath {
  constructor() {
    super('contentcalender');
  }

  Publish = this.getPath('publish');
  Activity = this.getPath('activity');
}

export const PATH_AUTH = new PathAuth();
export const PATH_DASHBOARD = new PathDashboard();
export const PATH_WEBSITE = new PathWebsite();
export const PATH_SOCIAL_MEDIA = new PathSocialMedia();
export const PATH_RESEARCH = new PathResearch();
export const PATH_PUBLIC = new PathPublic();
export const PATH_EMAIL = new PathEmail();
export const PATH_CRM = new PathCRM();
export const PATH_COLDCALL = new PathColdCall();
export const PATH_RECEPTIONIST = new PathReceptionist();
export const PATH_CONTENTCALENDER = new PathContentCalender();

export const PATH_PAGES = {
  ...PATH_DASHBOARD,
  ...PATH_WEBSITE,
  ...PATH_SOCIAL_MEDIA,
  ...PATH_RESEARCH,
  ...PATH_RECEPTIONIST,
  ...PATH_EMAIL,
  ...PATH_CRM,
  ...PATH_COLDCALL,
  ...PATH_CONTENTCALENDER,
};

export const AUTH_ENDPOINTS = [PATH_AUTH.signIn, PATH_AUTH.signUp, PATH_AUTH.forgotPassword, PATH_AUTH.resetPassword];

export const ProtectedRoutes: Record<AgentType, string[]> = {
  [AgentType.Dashboard]: [
    PATH_DASHBOARD.dashboardHome,
    PATH_DASHBOARD.dashboardBots,
    PATH_DASHBOARD.notifications,
    PATH_DASHBOARD.account,
    PATH_DASHBOARD.calendar,
    PATH_DASHBOARD.setting,
    PATH_DASHBOARD.changepassword,
    PATH_DASHBOARD.confirmPassword,
    PATH_DASHBOARD.help,
    PATH_DASHBOARD.nothingfound,
  ],
  [AgentType.Website]: [
    PATH_WEBSITE.meet,
    PATH_WEBSITE.websiteActivities,
    PATH_WEBSITE.websiteActivitiesChat,
    PATH_WEBSITE.meetRoom,
    PATH_WEBSITE.dataSource,
    PATH_WEBSITE.embedSettings,
  ],
  [AgentType.SocialMedia]: [
    PATH_SOCIAL_MEDIA.publish,
    PATH_SOCIAL_MEDIA.socialMediaActivities,
    PATH_SOCIAL_MEDIA.brandSetup,
    PATH_SOCIAL_MEDIA.templateGenerator,
  ],
  [AgentType.Research]: [PATH_RESEARCH.researchHome, PATH_RESEARCH.favourite],
  [AgentType.Email]: [PATH_EMAIL.emailHome, PATH_EMAIL.send, PATH_EMAIL.draft, PATH_EMAIL.configure],
  [AgentType.Crm]: [PATH_CRM.crmHome, PATH_CRM.crmContactView],
  [AgentType.ColdCalling]: [
    PATH_COLDCALL.coldCallHome,
    PATH_COLDCALL.campaign,
    PATH_COLDCALL.campaignDetails,
    PATH_COLDCALL.accountSettings,
  ],
  [AgentType.Receptionist]: [
    PATH_RECEPTIONIST.receptionistHome,
    PATH_RECEPTIONIST.contact,
    PATH_RECEPTIONIST.accountsettings,
  ],
  [AgentType.ContentCalender]: [],
};

export const PROTECTED_ENDPOINTS = [
  ...ProtectedRoutes[AgentType.Dashboard],
  ...ProtectedRoutes[AgentType.Website],
  ...ProtectedRoutes[AgentType.SocialMedia],
  ...ProtectedRoutes[AgentType.Research],
  ...ProtectedRoutes[AgentType.ColdCalling],
  ...ProtectedRoutes[AgentType.Receptionist],
  ...ProtectedRoutes[AgentType.Email],
  ...ProtectedRoutes[AgentType.Crm],
  ...ProtectedRoutes[AgentType.Receptionist],
];

export const PUBLIC_ENDPOINTS = [PATH_PUBLIC.ContentCalender];

export function determineAgent(path: string): AgentType | null {
  if (PATH_DASHBOARD.belongsToPath(path)) return AgentType.Dashboard;
  if (PATH_WEBSITE.belongsToPath(path)) return AgentType.Website;
  if (PATH_SOCIAL_MEDIA.belongsToPath(path)) return AgentType.SocialMedia;
  if (PATH_RESEARCH.belongsToPath(path)) return AgentType.Research;
  if (PATH_COLDCALL.belongsToPath(path)) return AgentType.ColdCalling;
  if (PATH_RECEPTIONIST.belongsToPath(path)) return AgentType.Receptionist;
  if (PATH_EMAIL.belongsToPath(path)) return AgentType.Email;
  if (PATH_CRM.belongsToPath(path)) return AgentType.Crm;
  return null;
}
