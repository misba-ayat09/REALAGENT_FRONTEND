import { Button, Divider, Flex, PasswordInput, Text } from '@mantine/core';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import classes from './general.module.css';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGES } from '../../../router/route';
import { useAppSelector } from '../../../store';
import { useState } from 'react';
import {
  changePasswordAPI,
  OldPasswordVerificationFormData,
} from '../../../store/features/change-password/change-passwordAPI';
import { toast } from 'sonner';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.authentication.userData.userId);
  const handleConfirm = async () => {
    try {
      const formData: OldPasswordVerificationFormData = {
        userId: userId!,
        oldPassword,
      };

      const response = await changePasswordAPI.verifyOldPassword(formData);
      if (response?.status === 'SUCCESS') {
        toast.success('Password verified successfully');
        navigate(PATH_PAGES.confirmPassword);
      } else {
        toast.error(response?.result?.message || 'Old password is incorrect');
      }
    } catch (error) {
      console.error('Error verifying old password', error);
      toast.error('Old password is invalid');
    } finally {
    }
  };

  const handlePrivacy = () => {
    window.location.href = 'https://privacypolicy.realtorbots.ai/';
  };

  return (
    <div>
      <div style={{ backgroundColor: 'white', padding: '1rem' }}>
        <Text size="xl" fw={700}>
          Settings
        </Text>
        <Text c="dimmed">{'User account settings'}</Text>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 2fr',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'white',
        }}>
        <div className={classes.passcontainer}>
          <Flex
            style={{
              cursor: 'pointer',
              gap: '20px',
            }}>
            <Icon icon={IconType.Key} />
            <Text className={classes.passwordtitle}>Change Password</Text>
          </Flex>
          <Flex
            style={{
              cursor: 'pointer',
              gap: '20px',
            }}>
            <Icon icon={IconType.privacyIcon} />
            <Text className={classes.passwordtitle} onClick={handlePrivacy}>
              Privacy policy
            </Text>
          </Flex>
        </div>

        <Divider orientation="vertical" />

        <div>
          <Text fw={600} fs={'20'} ff={'Roboto'} mb="sm">
            Change Password
          </Text>
          <PasswordInput
            placeholder="Enter old password"
            label="Enter old password"
            size="md"
            mb="md"
            w="50%"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            styles={{
              label: {
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '16.41px',
                textAlign: 'left',
                marginBottom: '8px', // Adjust the gap between label and input
              },
              input: {
                backgroundColor: '#6A6A6A1A',
                borderRadius: '46px',
              },
            }}
          />

          <Button size="md" color="blue" onClick={handleConfirm} radius={'40px'}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
