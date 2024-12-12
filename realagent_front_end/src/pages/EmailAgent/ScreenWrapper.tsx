import { Box, Flex } from '@mantine/core';
import React from 'react';
import { ConnectedAccountsList, HeaderNav } from '../../components';
import { useConnectedAccounts } from '../../hooks';
import { SocialMedia } from '../../common/enum';
import { Icon } from '../../components/common/Icons/Icon';
import { IconType } from '../../components/common/Icons';

const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connectedAccounts } = useConnectedAccounts();

  return (
    <Box
      style={{
        minHeight: '89vh',
        width: '100%',
        background: 'white',
        borderRadius: 'calc(15px * var(--scale-factor))',
      }}>
      <Flex direction={'row'} justify={'space-between'} pr={'15px'} w={'100%'}>
        <HeaderNav title={`Email Agent`} discription="" height={90} />
        <ConnectedAccountsList
          accounts={connectedAccounts[SocialMedia.GOOGLE]}
          label="Synced"
          icon={<Icon icon={IconType.Sync} style={{ width: 20, height: 20, marginTop: 10 }} />}
        />
      </Flex>
      {children}
    </Box>
  );
};

export default ScreenWrapper;
