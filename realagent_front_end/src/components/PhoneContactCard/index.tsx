import { Button, Divider, Popover, Text, Table, Modal, Group } from '@mantine/core';
import { IconType } from '../common/Icons';
import { Icon } from '../common/Icons/Icon';
import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteContact, getallContact } from '../../store/features/AddContact/contactSlice';
import { FlexBox } from '../common/FlexBox/FlexBox';
import EditContactModal from '../Modal/EditContactModal';
import { UpdateContactFormdata } from '../../store/features/AddContact';
import classes from './contact.module.css';

const PhoneContactCard = () => {
  const [opened, setOpened] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const calls = useAppSelector((state) => state.contact.result) || [];
  const [meetingToBeEdited, setMeetingToBeEdited] = useState<UpdateContactFormdata>();

  const handleMoreClick = (index: number) => {
    if (activeRow === index) {
      setOpened(!opened);
    } else {
      setActiveRow(index);
      setOpened(true);
    }
  };

  const handleContactEditedClose = () => {
    setIsEditModal(false);
    setMeetingToBeEdited(undefined);
  };

  const openEditModal = (contact: SetStateAction<UpdateContactFormdata | undefined>) => {
    setIsEditModal(true);
    setMeetingToBeEdited(contact);
    setOpened(false);
  };

  const openDeleteModal = (id: string) => {
    setIsDeleteModal(true);
    setDeleteId(id);
    setOpened(false);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteContact(id));
    setIsDeleteModal(false);
    setDeleteId(null);
    dispatch(getallContact());
  };

  useEffect(() => {
    dispatch(getallContact());
  }, [dispatch]);

  if (!Array.isArray(calls)) {
    console.error('Expected calls to be an array, but received:', calls);
    return null;
  }
  return (
    <Table style={{ tableLayout: 'fixed', width: '100%' }}>
      <thead
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          marginBottom: '10px',
          // boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        }}>
        <tr style={{ display: 'flex', width: '100%' }}>
          <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Name</td>
          <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Phone Number</td>
          <td style={{ flex: 0.6, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Email</td>
          <td style={{ flex: 0.4, color: '#7A7A7A', fontWeight: '600' }}></td>
        </tr>
      </thead>
      <tbody style={{ display: 'flex', flexDirection: 'column' }}>
        {calls.map((call, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderRadius: '10px',
              marginBottom: '10px',
            }}>
            <td
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                padding: '10px',
                textAlign: 'left',
                gap: '10px',
              }}>
              <Icon icon={IconType.user} />
              <Text>{call.firstName}</Text>
            </td>
            <td
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textAlign: 'left',
              }}>
              <Text>{call.phoneNumber}</Text>
            </td>
            <td
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textAlign: 'left',
              }}>
              {call?.email || 'Email not provided'}
            </td>
            <td style={{ flex: 0.1 }}>
              <Popover
                opened={opened && activeRow === index}
                onClose={() => setOpened(false)}
                width={140}
                position="left">
                <Popover.Target>
                  <div
                    onClick={() => handleMoreClick(index)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                    }}>
                    <Icon icon={IconType.more} />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <div>
                    <Button
                      variant="subtle"
                      onClick={() => openEditModal(call)}
                      style={{ color: 'black', backgroundColor: 'white' }}
                      leftSection={<Icon icon={IconType.edit} />}>
                      Edit
                    </Button>
                    <Divider />
                    <Button
                      variant="subtle"
                      onClick={() => openDeleteModal(call._id)}
                      leftSection={<Icon icon={IconType.delete1} />}
                      style={{ color: '#B24432', backgroundColor: 'white' }}>
                      Delete
                    </Button>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal.Root
        opened={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        centered
        classNames={{
          root: classes.modalRoot,
        }}>
        <Modal.Overlay
          classNames={{
            overlay: classes.modalOverlay,
          }}
        />
        <Modal.Content
          classNames={{
            content: classes.modalContent,
          }}>
          <Modal.Header>
            <Group style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
              <Text className={classes.modalTitle}>Are you sure you want to delete this Contact?</Text>
              <Text className={classes.modalTitle1}>This action cannot be undone</Text>
            </Group>
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <FlexBox
              borderRadius={10}
              width={'100%'}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              alignContent="center">
              <FlexBox container alignContent="center" width={'100%'} justifyContent="flex-end" style={{ gap: '10px' }}>
                <Button
                  bg={'rgba(230, 242, 255, 1)'}
                  style={{ color: '#007BFF' }}
                  onClick={() => setIsDeleteModal(false)}
                  radius={40}
                  w={'111px'}
                  h={'40px'}>
                  Cancel
                </Button>
                <Button bg={'#B24432'} onClick={() => handleDelete(deleteId!)} radius={40} w={'111px'} h={'40px'}>
                  Yes, Delete
                </Button>
              </FlexBox>
            </FlexBox>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {isEditModal && meetingToBeEdited && (
        <EditContactModal
          open={isEditModal}
          onClose={handleContactEditedClose}
          contactDetailsToBeEdited={meetingToBeEdited}
        />
      )}
    </Table>
  );
};

export default PhoneContactCard;
