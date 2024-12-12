import { Flex, Text, Button } from '@mantine/core';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import classes from "./ContactViewDetails.module.css";

export default function ContactViewDetails() {
  // Sample contact detail
  const contact = {
    id: 1,
    name: 'John Doe',
    phoneNumber: '+1234567890',
    email: 'john.doe@example.com',
    description: 'Ms Jessica Garcia interested in exploring beachfront condos in Florida, preferably a quiet location under $1 million. Scheduled a meeting with Jessica Garcia at 10 am.',
    lastcontacted: '12 Jan 2024 12:30PM'
  };

  return (
    <Flex className={classes.ContactViewDetails} direction="column">
      <div className={classes.profilePhoto}>
        <Icon icon={IconType.UserRounded} style={{ width: '48px', height: '48px' }}/>
      </div>
      <Text className={classes.name}>{contact.name}</Text>
      <Flex className={classes.contactDetails}>
        <Text>{contact.phoneNumber}</Text>
        <Text>{contact.email}</Text>
      </Flex>
      <Text className={classes.description}>{contact.description}</Text>
      <Flex className={classes.shortcutButton}>
        <Button variant="subtle">
          <Icon icon={IconType.PhoneRounded} style={{ width: '40px', height: '40px' }} />
          <Text>Call</Text>
        </Button>
        <Button variant="subtle">
          <Icon icon={IconType.EmailRounded} style={{ width: '40px', height: '40px' }} />
          <Text>Mail</Text>
        </Button>
        <Button variant="subtle">
          <Icon icon={IconType.CalendarRounded} style={{ width: '40px', height: '40px' }} />
          <Text>Meeting</Text>
        </Button>
        <Button variant="subtle">
          <Icon icon={IconType.NotesRounded} style={{ width: '40px', height: '40px' }} />
          <Text>Notes</Text>
        </Button>
      </Flex>
      <div className={classes.lastContacted}><p><span>Last Contacted: </span>{contact.lastcontacted}</p></div>
    </Flex>
  );
}
