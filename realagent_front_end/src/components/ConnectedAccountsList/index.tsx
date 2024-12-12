import React from 'react';
import { Flex, Text } from '@mantine/core';
import { ConnectedResponse } from '../../store/features/authentication/userApi';

interface ConnectedAccountsListProps {
  accounts: ConnectedResponse[];
  label: string;
  icon: React.ReactNode;
}

const ConnectedAccountsList: React.FC<ConnectedAccountsListProps> = ({ accounts, label, icon }) => {
  const hasConnectedAccounts = accounts.some((account) => account.alreadyConnected);

  return (
    <Flex align="center" gap="1px" direction="row">
      {icon}
      <Text style={{ fontSize: 16, fontWeight: 600, color: '#292929' }}>{label}:&nbsp;</Text>
      {hasConnectedAccounts ? (
        accounts.map((item) => (
          <Text key={item.email || Math.random()} style={{ fontSize: 16, fontWeight: 400, color: '#292929' }}>
            {item.email || 'No email provided'}
          </Text>
        ))
      ) : (
        <Text style={{ fontSize: 16, fontWeight: 400, color: '#292929' }}>No mail connected</Text>
      )}
    </Flex>
  );
};

export default ConnectedAccountsList;
