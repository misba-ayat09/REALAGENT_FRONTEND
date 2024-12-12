import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Text, Button, Group, TextInput, Autocomplete, Loader, Flex } from '@mantine/core';
import PhoneInput from 'react-phone-input-international';
import { useAppDispatch } from '../../../store';
import { addContact, getallContact } from '../../../store/features/AddContact/contactSlice';
import { AddContactFormdata } from '../../../store/features/AddContact';
import classes from './ContactModal.module.css';
import { toast } from 'sonner';

interface AddToContactModalProps {
  open: boolean;
  onClose: () => void;
}

const AddToContactModal: React.FC<AddToContactModalProps> = ({ open, onClose }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const dispatch = useAppDispatch();
  const initialFormData: AddContactFormdata = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }),
    [],
  );

  const [formData, setFormData] = useState<AddContactFormdata>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (open) {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [initialFormData, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleEmailChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setFormData((prev) => ({
      ...prev,
      email: val,
    }));

    if (val?.trim()?.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePhoneNumberChange: (value: string | null) => void = (value) => {
    const formattedPhoneNumber = value ? (value.startsWith('+') ? value : `+${value}`) : '';
    setFormData((prev) => ({
      ...prev,
      phoneNumber: formattedPhoneNumber.replace(/(\+\d{1,2})(\d+)/g, '$1 $2'),
    }));
    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
  };

  const handleSubmit = async () => {
    if (validate()) {
      const allContacts = await dispatch(getallContact()).unwrap();
      const isPhoneNumberExists = allContacts?.result?.find((contact) => contact.phoneNumber === formData.phoneNumber);

      if (isPhoneNumberExists) {
        toast.error('This phone number already exists in your contacts.');
      } else {
        await dispatch(addContact(formData));
        onClose();
        dispatch(getallContact());
      }
    } else {
      toast.error('Please fill in all required fields correctly.');
    }
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
              <Text className={classes.modalTitle}>Add Contact</Text>
              <Text className={classes.modalTitle1}>Contacts added will be reflected in the contact list</Text>
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
                  error={errors.firstName}
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
                  error={errors.lastName}
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
                  placeholder="Phone Number"
                  enableSearch
                  disableSearchIcon
                  country={'us'}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
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
                    borderColor: isFocused ? '#007bff' : 'transparent',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: isFocused ? 'white' : 'rgba(106, 106, 106, 0.1)',
                    borderColor: isFocused ? '#007bff' : 'transparent',
                    borderTopLeftRadius: '64px',
                    borderBottomLeftRadius: '64px',
                  }}
                />
                {errors.phoneNumber && (
                  <Text color="red" size="sm">
                    {errors.phoneNumber}
                  </Text>
                )}
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
                  value={formData.email}
                  onChange={handleEmailChange}
                  error={errors.email}
                />
              </div>
              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button variant="default" className={classes.addButton} onClick={handleSubmit} bg={'#007BFF'}>
                  Add
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default AddToContactModal;
