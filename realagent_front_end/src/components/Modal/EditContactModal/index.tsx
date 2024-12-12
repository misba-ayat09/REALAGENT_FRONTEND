import React, { useState, useEffect } from 'react';
import { Modal, Text, Button, Group, TextInput, Autocomplete,Flex} from '@mantine/core';
import { useAppDispatch } from '../../../store';
import { toast } from 'sonner';
import { UpdateContactFormdata } from '../../../store/features/AddContact';
import classes from './edit.module.css';
import PhoneInput from 'react-phone-input-international';
import { getallContact, updateContact } from '../../../store/features/AddContact/contactSlice';
interface EditModalProps {
  open: boolean;
  onClose: () => void;
  contactDetailsToBeEdited: UpdateContactFormdata;
}

const EditContactModal: React.FC<EditModalProps> = ({ open, onClose, contactDetailsToBeEdited }) => {
  const [formData, setFormData] = useState<UpdateContactFormdata>(contactDetailsToBeEdited);
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (contactDetailsToBeEdited && open) {
      setFormData(contactDetailsToBeEdited);
    }
  }, [contactDetailsToBeEdited, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEmailChange = (val: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        ['email']: val,
      };
    });
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
    await dispatch(updateContact(formData)).then(() => {
      dispatch(getallContact());
      toast.success('Contact updated successfully');
    });
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
        size={'xs'}
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
              <Text className={classes.modalTitle}>Edit Contact</Text>
              <Text className={classes.modalTitle1}>Edited contacts will be reflected in the contact list</Text>
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
                  placeholder="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                  type="text"
                  label="First Name"
                  required
                />
                <TextInput
                  classNames={{
                    input: classes.text_input,
                    label: classes.label,
                  }}
                  placeholder="lastName"
                  type="text"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  required
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
                  onChange={(value) => handlephoneNumber(value)}
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
                  required
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  type="email"
                  label="Email id"
                  placeholder="Enter Your Email Id"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
              </div>
              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'}>
              <Button className={classes.cancelButton} onClick={handleOnClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                className={classes.addButton}
                onClick={handleSubmit}
                bg={'#007BFF'}
                >
                Edit
              </Button>
            </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default EditContactModal;
