import { AgentType } from '../../../../common/enum/agent.enum';
import { AgentIconType } from '../AgentIconType.enum';

import DashboardType1 from './Dashboard/Type1.svg';
import DashboardType2 from './Dashboard/Type2.svg';
import DashboardType3 from './Dashboard/Type3.svg';

import EmailType1 from './Email/Type1.svg';
import EmailType2 from './Email/Type2.svg';
import EmailType3 from './Email/Type3.svg';
import EmailType4 from './Email/Type4.svg';

import PhoneType1 from './Phone/Type1.svg';
import PhoneType2 from './Phone/Type2.svg';
import PhoneType3 from './Phone/Type3.svg';
import PhoneType4 from './Phone/Type4.svg';

import ResearchType1 from './Research/Type1.svg';
import ResearchType2 from './Research/Type2.svg';
import ResearchType3 from './Research/Type3.svg';
import ResearchType4 from './Research/Type4.svg';

import SocialMediaType1 from './SocialMedia/Type1.svg';
import SocialMediaType2 from './SocialMedia/Type2.svg';
import SocialMediaType3 from './SocialMedia/Type3.svg';
import SocialMediaType4 from './SocialMedia/Type4.svg';

import WebsiteType1 from './Website/Type1.svg';
import WebsiteType2 from './Website/Type2.svg';
import WebsiteType3 from './Website/Type3.svg';
import WebsiteType4 from './Website/Type4.svg';

type IconsMap = {
  [key in AgentType]: {
    [key in AgentIconType]: string;
  };
};

export const icons: IconsMap = {
  [AgentType.Dashboard]: {
    [AgentIconType.Type1]: DashboardType1,
    [AgentIconType.Type2]: DashboardType2,
    [AgentIconType.Type3]: DashboardType3,
    [AgentIconType.Type4]: DashboardType3,
  },
  [AgentType.Email]: {
    [AgentIconType.Type1]: EmailType1,
    [AgentIconType.Type2]: EmailType2,
    [AgentIconType.Type3]: EmailType3,
    [AgentIconType.Type4]: EmailType4,
  },
  [AgentType.ColdCalling]: {
    [AgentIconType.Type1]: PhoneType1,
    [AgentIconType.Type2]: PhoneType2,
    [AgentIconType.Type3]: PhoneType3,
    [AgentIconType.Type4]: PhoneType4,
  },
  [AgentType.Research]: {
    [AgentIconType.Type1]: ResearchType1,
    [AgentIconType.Type2]: ResearchType2,
    [AgentIconType.Type3]: ResearchType3,
    [AgentIconType.Type4]: ResearchType4,
  },
  [AgentType.SocialMedia]: {
    [AgentIconType.Type1]: SocialMediaType1,
    [AgentIconType.Type2]: SocialMediaType2,
    [AgentIconType.Type3]: SocialMediaType3,
    [AgentIconType.Type4]: SocialMediaType4,
  },
  [AgentType.Website]: {
    [AgentIconType.Type1]: WebsiteType1,
    [AgentIconType.Type2]: WebsiteType2,
    [AgentIconType.Type3]: WebsiteType3,
    [AgentIconType.Type4]: WebsiteType4,
  },
  [AgentType.Crm]: {
    [AgentIconType.Type1]: WebsiteType1,
    [AgentIconType.Type2]: WebsiteType2,
    [AgentIconType.Type3]: WebsiteType3,
    [AgentIconType.Type4]: WebsiteType4,
  },
  [AgentType.Receptionist]: {
    [AgentIconType.Type1]: PhoneType1,
    [AgentIconType.Type2]: PhoneType2,
    [AgentIconType.Type3]: PhoneType3,
    [AgentIconType.Type4]: PhoneType4,
  },
};
