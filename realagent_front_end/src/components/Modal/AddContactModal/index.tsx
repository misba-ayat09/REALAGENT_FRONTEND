import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, Button, Group, TextInput, Autocomplete, Loader, Flex } from '@mantine/core';
import PhoneInput from 'react-phone-input-international';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addContact } from '../../../store/features/AddContact/contactSlice';
import { AddContactFormdata } from '../../../store/features/AddContact';
import classes from './ContactModal.module.css';
import { getAllCalls } from '../../../store/features/ReceptionistAgent';

interface AddToContactModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const AddContactModal: React.FC<AddToContactModalProps> = ({ open, onClose, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const dispatch = useAppDispatch();
  const call = useAppSelector((state) => state.phoneAgent.calls?.items.find((call) => call.id === id));

  const [formData, setFormData] = useState<AddContactFormdata>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    dispatch(getAllCalls());
  }, [dispatch]);

  useEffect(() => {
    if (call) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: call.phoneNumber,
      }));
    }
  }, [call]);

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEmailChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setFormData((prev) => {
      return {
        ...prev,
        ['email']: val,
      };
    });

    if (val?.trim()?.length === 0 || val?.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlephoneNumber: (value: string | null) => void = (value) => {
    const formattedPhoneNumber = value ? (value.startsWith('+') ? value : `+${value}`) : '';
    setFormData((prev) => {
      return {
        ...prev,
        phoneNumber: formattedPhoneNumber.replace(/(\+\d{1,2})(\d+)/g, '$1 $2'),
      };
    });
  };

  const handleSubmit = async () => {
    await dispatch(addContact(formData));
    dispatch(getAllCalls());

    onClose();
  };
  const handleOnClose = () => {
    onClose();
  };

  return (
    <>
      <Modal.Root
        opened={open}
        onClose={onClose}
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
              <Text className={classes.modalTitle}>Add To Contact</Text>
            </Group>
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <Group justify="center">
              <div className={classes.inputGroup}>
                <TextInput
                  classNames={{
                    input: classes.text_input,
                    label: classes.label,
                  }}
                  placeholder="First name"
                  label="First Name"
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextInput
                  classNames={{
                    input: classes.text_input,
                    label: classes.label,
                  }}
                  placeholder="Last name"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  flexDirection: 'column',
                }}>
                <label
                  style={{
                    fontSize: 'calc(16px * var(--scale-factor))',
                    color: '#292929',
                    fontWeight: 500,
                  }}>
                  Phone number
                </label>
                <PhoneInput
                  placeholder={formData.phoneNumber}
                  enableSearch
                  disableSearchIcon
                  country={'us'}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  value={formData.phoneNumber}
                  onChange={handlephoneNumber}
                  containerStyle={{
                    width: 'calc(386px * var(--scale-factor))',
                    height: 'calc(44px * var(--scale-factor))',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '64px',
                    marginTop: '10px',
                    borderColor: '#FDCA47',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: 'calc(46px * var(--scale-factor))',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '64px',
                    backgroundColor: isFocused ? 'white' : 'rgba(106, 106, 106, 0.1)',
                    border: 'none',
                    outline: 'none',
                  }}
                  searchStyle={{
                    width: 'calc(165px * var(--scale-factor))',
                    height: 'calc(31px * var(--scale-factor))',
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    borderColor: isFocused ? 'green' : '#B24432',
                    padding: '10px',
                    margin: '0px',
                    placeSelf: 'center',
                    fontSize: 'calc(16 * var(--scale-factor))',
                    fontFamily: 'Roboto',
                  }}
                  dropdownStyle={{
                    width: 'calc(188px * var(--scale-factor))',
                    height: 'calc(182px * var(--scale-factor))',
                    border: 'none',
                    outline: 'none',
                    fontSize: 'calc(16 * var(--scale-factor))',
                    fontFamily: 'Roboto',
                    padding: '10x',
                    borderRadius: '5px',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                  }}
                  buttonStyle={{
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>
              <div className={classes.inputGroup_email_password}>
                <Autocomplete
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  rightSection={loading ? <Loader size="1rem" /> : null}
                  type="email"
                  label="Email id"
                  placeholder="Enter Your Email Id"
                  value={formData?.email}
                  onChange={handleEmailChange}
                />
              </div>
              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'} p={'10px'} pr={40}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button variant="default" className={classes.addButton} onClick={handleSubmit} bg={'#007BFF'}>
                  Add To Contact
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default AddContactModal;
