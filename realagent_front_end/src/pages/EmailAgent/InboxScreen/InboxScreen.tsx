import { Box, Flex, LoadingOverlay, Tabs as MantineTab } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './index.module.css';
import { cx } from '../../../helper';
import { useAppDispatch, useAppSelector } from '../../../store';
import EmailInbox from '../../../components/EmailAgentCommon/EmailInbox/EmailInbox';
import { EmailDetails } from '../../../components/EmailAgentCommon/EmailDetails';
import ScreenWrapper from '../ScreenWrapper';
import { EmailType } from '../../../store/features/emailAgent/types';
import { LABEL_TAB_LOOKUP, Tabs, tabThunkMap } from './emailConstants';

const InboxScreen = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Important);
  const emailStatus = useAppSelector((state) => state.email.status);
  const dispatch = useAppDispatch();

  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);

  const allEmails = useAppSelector((state) => state.email.emails);

  useEffect(() => {
    const thunk = tabThunkMap[activeTab];
    if (thunk) {
      dispatch(thunk({}));
    }
  }, [activeTab, dispatch]);

  return (
    <>
      {!selectedEmail ? (
        <Flex direction={'column'}>
          <LoadingOverlay visible={emailStatus === 'loading'} pos={'fixed'} />
          <ScreenWrapper>
            <Flex h={60} bg={'#FFFFFF'}>
              <MantineTab
                value={activeTab}
                onChange={(val) => setActiveTab(val as Tabs)}
                color="#007BFF"
                w={'100%'}
                p={10}
                pt={10}
                variant="pills"
                radius={27}
                h={34}>
                <MantineTab.List>
                  {Object.entries(Tabs).map(([key, value]) => (
                    <MantineTab.Tab
                      className={cx(
                        classes.tab,
                        { [classes.active]: activeTab === value },
                        { [classes.inactive]: activeTab !== value },
                      )}
                      value={value}
                      key={key}>
                      {key}
                    </MantineTab.Tab>
                  ))}
                </MantineTab.List>
              </MantineTab>
            </Flex>
            <Box style={{ minHeight: '100vh', background: 'white', width: '100%' }}>
              <EmailInbox emails={allEmails[LABEL_TAB_LOOKUP[activeTab]]} setEmail={setSelectedEmail}/>
            </Box>
          </ScreenWrapper>
        </Flex>
      ) : (
        <ScreenWrapper>
          <EmailDetails email={selectedEmail} clearEmail={() => setSelectedEmail(null)} />
        </ScreenWrapper>
      )}
    </>
  );
};

export default InboxScreen;
