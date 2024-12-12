import { Table, Button, Input, Flex, Text, Indicator } from '@mantine/core';
import { useState } from 'react';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import classes from './CustomerListCard.module.css';

export default function CustomerListTable() {
  // Sample contact data
  const contacts = [
    {
      id: 1,
      name: 'Michael',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+1234567890',
      email: 'client@gmail.com ',
    },
    {
      id: 2,
      name: 'Jessica',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
    {
      id: 3,
      name: 'Mathew',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
    {
      id: 4,
      name: 'Michael',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+1234567890',
      email: 'client@gmail.com ',
    },
    {
      id: 5,
      name: 'Jessica',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
    {
      id: 6,
      name: 'Mathew',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
    {
      id: 7,
      name: 'Michael',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+1234567890',
      email: 'client@gmail.com ',
    },
    {
      id: 8,
      name: 'Jessica',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
    {
      id: 9,
      name: 'Mathew',
      summary:
        'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
      phoneNumber: '+0987654321',
      email: 'client@gmail.com ',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort contacts based on name
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.name < b.name) return sortAsc ? -1 : 1;
    if (a.name > b.name) return sortAsc ? 1 : -1;
    return 0;
  });

  const items = sortedContacts.map((item) => (
    <tr key={item.id}>
      <td>
        <Icon icon={IconType.user} />
        <span>{item.name}</span>
      </td>
      <td>{item.summary}</td>
      <td>
        <Button
          variant="subtle"
          bg={'#AAF089'}
          c={'#292929'}
          radius={18}
          leftSection={<Indicator position="middle-start" size={20} withBorder processing pl={5} color={'green'} />}>
          Lorem ispum
        </Button>
      </td>
      <td> Lorem ispum</td>
      <td>
        <Button variant="subtle">
          <Icon icon={IconType.edit} />
        </Button>
      </td>
    </tr>
  ));

  return (
    <Flex className={classes.customerListMain} direction="column" style={{ width: '100%', padding: '16px' }}>
      <Flex align="center" justify="space-between" mb="16px">
        <div className={classes.searchContainer}>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Search..."
            style={{ paddingRight: '100px' }} // Adjust padding to fit the button
          />
          <Button className={classes.searchButton} onClick={() => console.log('Search')}>
            <Icon icon={IconType.Search} />
          </Button>
        </div>
        <Button className={classes.sortButton} onClick={() => setSortAsc(!sortAsc)}>
          {sortAsc ? (
            <>
              <Icon icon={IconType.Sort} />
              <span>Sort</span>
            </>
          ) : (
            <>
              <Icon icon={IconType.Sort} />
              <span>Sort</span>
            </>
          )}
        </Button>
      </Flex>

      {sortedContacts.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '30%' }}>Summary</th>
              <th style={{ width: '20%' }}>Status</th>
              <th style={{ width: '20%' }}>Next Action</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </Table>
      ) : (
        <Text>
          <div className={classes.notFound}>
            <p>No clients found</p>
          </div>
        </Text>
      )}
    </Flex>
  );
}
