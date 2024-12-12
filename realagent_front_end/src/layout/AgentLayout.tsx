// import {
//   AppShell,
//   AppShellAsideConfiguration,
//   AppShellHeaderConfiguration,
//   AppShellNavbarConfiguration,
//   Button,
// } from '@mantine/core';
// import classes from './Layout.module.css';
// import cx from 'clsx';
// import { useBreakpoints, useConnectedAccounts } from '../hooks';
// import { DynamicCard, Header } from '../components';
// import { Suspense, useState } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { determineAgent, PATH_DASHBOARD, PATH_EMAIL, PATH_PAGES, ProtectedRoutes } from '../router/route';
// import Navigation, { NavigationDataType } from '../components/Navigation';
// import { NavigationData } from './NavigationData';
// import { ChatBot } from '../lib';
// import { scalar } from '../helper';
// import { AgentType } from '../common/enum/agent.enum';
// import { SocialMedia } from '../common/enum';
// import { useAppSelector } from '../store/hooks/hooks';
// import BuyNumberModal from '../components/Modal/BuyNumberModal';
// import NavigationIcon from '../components/Navigation/NavigationIcon/NavigationIcon';
// import { NavigationIconType } from '../components/Navigation/NavigationIcon/NavigationIconType.enum';
// import ColdCallBuyNumberModal from '../components/Modal/ColdCallBuyNumberModal';

// interface AppShellCustomConfiguration {
//   header: AppShellHeaderConfiguration;
//   navbar: AppShellNavbarConfiguration;
//   aside: AppShellAsideConfiguration;
// }

// interface LayoutProps {
//   isVisible?: Partial<{
//     header?: boolean;
//     navbar?: boolean;
//     aside?: boolean;
//   }>;
// }

// const AgentLayout: React.FC<LayoutProps> = ({ isVisible = {} }) => {
//   const navigate = useNavigate();

//   const { header: isVisibleHeader = true, navbar: isVisibleNavbar = true } = isVisible;
//   const { isMd, isXl } = useBreakpoints({ md: '800px', xl: '1100px' });

//   const appShellCustomConfiguration: AppShellCustomConfiguration = {
//     header: { height: 'calc(72px * var(--scale-factor))' },
//     navbar: {
//       width: isMd ? scalar(250) : scalar(80),
//       breakpoint: 0,
//     },
//     aside: {
//       width: isXl ? scalar(400) : 0,
//       breakpoint: 0,
//     },
//   };

//   const path = useLocation();
//   const voice = useAppSelector((state) => state?.phoneAgent?.configuaration);
//   const coldcallvoice = useAppSelector((state) => state?.coldCallBot?.configuaration);

//   const [openBuyPhoneModal, setOpenBuyPhoneModal] = useState<boolean>(false);

//   const agent = determineAgent(path.pathname) || AgentType.Dashboard;

//   const navData: NavigationDataType[] = NavigationData[agent] || NavigationData[AgentType.Dashboard];

//   const asideNotAllowedPaths: string[] = [];
//   const isVisibleAside = !asideNotAllowedPaths.includes(path.pathname) || isVisible.aside;

//   const googleDependentPaths: string[] = [
//     PATH_DASHBOARD.calendar,
//     PATH_EMAIL.emailHome,
//     PATH_EMAIL.send,
//     PATH_EMAIL.draft,
//     PATH_EMAIL.configure,
//     PATH_EMAIL.inbox,
//   ];

//   const isGoogleDependentPath = googleDependentPaths.includes(path.pathname);
//   const { connectedAccounts } = useConnectedAccounts(isGoogleDependentPath);
//   const isReceptionistPath = ProtectedRoutes[AgentType.Receptionist].includes(path.pathname);
//   const isColdCallPath = ProtectedRoutes[AgentType.ColdCalling].includes(path.pathname);

//   const hasConnectedGoogleAccounts = connectedAccounts[SocialMedia.GOOGLE].some((account) => account.alreadyConnected);

//   return (
//     <Suspense>
//       <AppShell
//         header={isVisibleHeader ? appShellCustomConfiguration.header : undefined}
//         navbar={isVisibleNavbar ? appShellCustomConfiguration.navbar : undefined}
//         aside={isVisibleAside ? appShellCustomConfiguration.aside : undefined}
//         withBorder={false}>
//         {isVisibleHeader ? (
//           <AppShell.Header>
//             <Header />
//           </AppShell.Header>
//         ) : null}
//         {isVisibleNavbar ? (
//           <AppShell.Navbar
//             classNames={{
//               navbar: cx(classes.navbar),
//             }}>
//             <Button
//               w={appShellCustomConfiguration.navbar?.width}
//               h={40}
//               c={'#007BFF'} // Text color
//               bg={'#FFFFFF'} // Background color
//               fs={'23px'}
//               ff={'Roboto'}
//               style={{ color: '#292929', background: '#FFFFFF', fontSize: '16px' }}
//               onClick={() => navigate(PATH_PAGES.botViewer)}
//               leftSection={<NavigationIcon type={NavigationIconType.Activities} color="#007BFF" />}>
//               Bot Viewer
//             </Button>

//             <Navigation data={navData} w={appShellCustomConfiguration.navbar?.width} isTextVisible={isMd} />
//           </AppShell.Navbar>
//         ) : null}
//         <AppShell.Main
//           classNames={{
//             main: cx(classes.main, {
//               [classes.mainPaddingWithNavbar]: isVisibleNavbar,
//               [classes.mainPaddingWithAside]: isVisibleAside,
//             }),
//           }}>
//           {isReceptionistPath && (!voice || voice.twilioPhoneNumber.trim() === '') ? (
//             <>
//               <DynamicCard
//                 title={`To use Phone Agent, you need to purchase a phone number. This will enable you to access the full
//                 features and functionality of the service.`}
//                 buttonText={'Buy Phone Number'}
//                 onClick={() => setOpenBuyPhoneModal(true)}
//               />
//               <BuyNumberModal open={openBuyPhoneModal} onClose={() => setOpenBuyPhoneModal(false)} />
//             </>
//           ) : isColdCallPath && (!coldcallvoice || coldcallvoice.twilioPhoneNumber.trim() === '') ? (
//             <>
//               <DynamicCard
//                 title={`To use Cold call bot, you need to purchase a phone number. This will enable you to access the full
//               features and functionality of the service.`}
//                 buttonText={'Buy Phone Number'}
//                 onClick={() => setOpenBuyPhoneModal(true)}
//               />
//               <ColdCallBuyNumberModal open={openBuyPhoneModal} onClose={() => setOpenBuyPhoneModal(false)} />
//             </>
//           ) : isGoogleDependentPath && !hasConnectedGoogleAccounts ? (
//             <DynamicCard
//               title={
//                 'To use this feature, you need to link your Google account. This will give you access to the full range of features and functionality offered by the service.'
//               }
//               buttonText={'Go to Accounts Page'}
//               onClick={() => navigate(PATH_DASHBOARD.account)}
//             />
//           ) : (
//             <Outlet />
//           )}
//         </AppShell.Main>
//         {isVisibleAside ? (
//           <AppShell.Aside classNames={{ aside: cx(classes.aside) }}>
//             <ChatBot />
//           </AppShell.Aside>
//         ) : null}
//       </AppShell>
//     </Suspense>
//   );
// };

// export default AgentLayout;


import {
  AppShell,
  AppShellAsideConfiguration,
  AppShellHeaderConfiguration,
  AppShellNavbarConfiguration,
  Button,
} from '@mantine/core';
import classes from './Layout.module.css';
import cx from 'clsx';
import { useBreakpoints, useConnectedAccounts } from '../hooks';
import { DynamicCard, Header } from '../components';
import { Suspense, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { determineAgent, PATH_DASHBOARD, PATH_EMAIL, PATH_PAGES, ProtectedRoutes } from '../router/route';
import Navigation, { NavigationDataType } from '../components/Navigation';
import Navigation1 from '../components/Navigation/Navigation1';  // Assuming Navigation1 is a separate component
import { NavigationData } from './NavigationData';
import { ChatBot } from '../lib';
import { scalar } from '../helper';
import { AgentType } from '../common/enum/agent.enum';
import { SocialMedia } from '../common/enum';
import { useAppSelector } from '../store/hooks/hooks';
import BuyNumberModal from '../components/Modal/BuyNumberModal';
import NavigationIcon from '../components/Navigation/NavigationIcon/NavigationIcon';
import { NavigationIconType } from '../components/Navigation/NavigationIcon/NavigationIconType.enum';
import ColdCallBuyNumberModal from '../components/Modal/ColdCallBuyNumberModal';

interface AppShellCustomConfiguration {
  header: AppShellHeaderConfiguration;
  navbar: AppShellNavbarConfiguration;
  aside: AppShellAsideConfiguration;
}

interface LayoutProps {
  isVisible?: Partial<{
    header?: boolean;
    navbar?: boolean;
    aside?: boolean;
  }>;
}

const AgentLayout: React.FC<LayoutProps> = ({ isVisible = {} }) => {
  const navigate = useNavigate();
  const { header: isVisibleHeader = true, navbar: isVisibleNavbar = true } = isVisible;
  const { isMd, isXl } = useBreakpoints({ md: '800px', xl: '1100px' });

  const appShellCustomConfiguration: AppShellCustomConfiguration = {
    header: { height: 'calc(72px * var(--scale-factor))' },
    navbar: {
      width: isMd ? scalar(250) : scalar(80),
      breakpoint: 0,
    },
    aside: {
      width: isXl ? scalar(400) : 0,
      breakpoint: 0,
    },
  };

  const path = useLocation();
  
  const voice = useAppSelector((state) => state?.phoneAgent?.configuaration);
  const coldcallvoice = useAppSelector((state) => state?.coldCallBot?.configuaration);

  const [openBuyPhoneModal, setOpenBuyPhoneModal] = useState<boolean>(false);

  const agent = determineAgent(path.pathname) || AgentType.Dashboard;

  const navData: NavigationDataType[] = NavigationData[agent] || NavigationData[AgentType.Dashboard];

  const asideNotAllowedPaths: string[] = [];
  const isVisibleAside = !asideNotAllowedPaths.includes(path.pathname) || isVisible.aside;

  const googleDependentPaths: string[] = [
    PATH_DASHBOARD.calendar,
    PATH_EMAIL.emailHome,
    PATH_EMAIL.send,
    PATH_EMAIL.draft,
    PATH_EMAIL.configure,
    PATH_EMAIL.inbox,
  ];

  const isGoogleDependentPath = googleDependentPaths.includes(path.pathname);
  const { connectedAccounts } = useConnectedAccounts(isGoogleDependentPath);
  const isReceptionistPath = ProtectedRoutes[AgentType.Receptionist].includes(path.pathname);
  const isColdCallPath = ProtectedRoutes[AgentType.ColdCalling].includes(path.pathname);

  const hasConnectedGoogleAccounts = connectedAccounts[SocialMedia.GOOGLE].some((account) => account.alreadyConnected);

  return (
    <Suspense>
      <AppShell
        header={isVisibleHeader ? appShellCustomConfiguration.header : undefined}
        navbar={isVisibleNavbar ? appShellCustomConfiguration.navbar : undefined}
        aside={isVisibleAside ? appShellCustomConfiguration.aside : undefined}
        withBorder={false}>
        {isVisibleHeader ? (
          <AppShell.Header>
            <Header />
          </AppShell.Header>
        ) : null}
        
        {/* Conditionally render Navigation or Navigation1 based on the path */}
        {isVisibleNavbar ? (
          path.pathname === '/contentcalender/activity' ? (
            <AppShell.Navbar
              classNames={{
                navbar: cx(classes.navbar),
              }}>
              <Button
                w={appShellCustomConfiguration.navbar?.width}
                h={40}
                c={'#007BFF'} // Text color
                bg={'#FFFFFF'} // Background color
                fs={'23px'}
                ff={'Roboto'}
                style={{ color: '#292929', background: '#FFFFFF', fontSize: '16px' }}
                onClick={() => navigate(PATH_PAGES.botViewer)}
                leftSection={<NavigationIcon type={NavigationIconType.Activity} color="#007BFF" />}>
                Bot Viewer
              </Button>

              {/* Render Navigation1 for the '/waitlist' path */}
              <Navigation1 data={navData} w={appShellCustomConfiguration.navbar?.width} isTextVisible={isMd} />
            </AppShell.Navbar>
          ) : (
            <AppShell.Navbar
              classNames={{
                navbar: cx(classes.navbar),
              }}>
              <Button
                w={appShellCustomConfiguration.navbar?.width}
                h={40}
                c={'#007BFF'} // Text color
                bg={'#FFFFFF'} // Background color
                fs={'23px'}
                ff={'Roboto'}
                style={{ color: '#292929', background: '#FFFFFF', fontSize: '16px' }}
                onClick={() => navigate(PATH_PAGES.botViewer)}
                leftSection={<NavigationIcon type={NavigationIconType.Activity} color="#007BFF" />}>
                Bot Viewer
              </Button>

              {/* Render the default Navigation component */}
              <Navigation data={navData} w={appShellCustomConfiguration.navbar?.width} isTextVisible={isMd} />
            </AppShell.Navbar>
          )
        ) : null}

        <AppShell.Main
          classNames={{
            main: cx(classes.main, {
              [classes.mainPaddingWithNavbar]: isVisibleNavbar,
              [classes.mainPaddingWithAside]: isVisibleAside,
            }),
          }}>
          {isReceptionistPath && (!voice || voice.twilioPhoneNumber.trim() === '') ? (
            <>
              <DynamicCard
                title={`To use Phone Agent, you need to purchase a phone number. This will enable you to access the full
                features and functionality of the service.`}
                buttonText={'Buy Phone Number'}
                onClick={() => setOpenBuyPhoneModal(true)}
              />
              <BuyNumberModal open={openBuyPhoneModal} onClose={() => setOpenBuyPhoneModal(false)} />
            </>
          ) : isColdCallPath && (!coldcallvoice || coldcallvoice.twilioPhoneNumber.trim() === '') ? (
            <>
              <DynamicCard
                title={`To use Cold call bot, you need to purchase a phone number. This will enable you to access the full
              features and functionality of the service.`}
                buttonText={'Buy Phone Number'}
                onClick={() => setOpenBuyPhoneModal(true)}
              />
              <ColdCallBuyNumberModal open={openBuyPhoneModal} onClose={() => setOpenBuyPhoneModal(false)} />
            </>
          ) : isGoogleDependentPath && !hasConnectedGoogleAccounts ? (
            <DynamicCard
              title={
                'To use this feature, you need to link your Google account. This will give you access to the full range of features and functionality offered by the service.'
              }
              buttonText={'Go to Accounts Page'}
              onClick={() => navigate(PATH_DASHBOARD.account)}
            />
          ) : (
            <Outlet />
          )}
        </AppShell.Main>
        
        {isVisibleAside ? (
          <AppShell.Aside classNames={{ aside: cx(classes.aside) }}>
            <ChatBot />
          </AppShell.Aside>
        ) : null}
      </AppShell>
    </Suspense>
  );
};

export default AgentLayout;