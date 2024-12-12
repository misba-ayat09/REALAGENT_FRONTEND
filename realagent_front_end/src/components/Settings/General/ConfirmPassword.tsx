import { Button, Divider, Flex, PasswordInput, Text } from '@mantine/core';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import classes from './general.module.css';
import { useState } from 'react';
import { ChangePasswordFormData, changePasswordAPI } from '../../../store/features/change-password/change-passwordAPI';
import { toast } from 'sonner';
import { useAppSelector } from '../../../store';
import { useNavigate } from 'react-router-dom';
import {  PATH_PAGES } from '../../../router/route';

export default function ConfirmPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppSelector((state) => state.authentication.userData.userId);

  const navigate = useNavigate();

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password?.length < 8 || password?.length > 20) {
      errors.push('Password must be 8-20 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must include at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must include at least one digit');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must include at least one special character');
    }
    return errors;
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const errors = validatePassword(password);
      if (errors?.length > 0) {
        toast.error(errors.join('\n'));
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const formData: ChangePasswordFormData = {
        userId: userId!,
        password,
        confirmPassword,
      };

      const response = await changePasswordAPI.changePassword(formData);
      if (response?.status === 'SUCCESS') {
        toast.success('Password changed successfully');
      } else {
        toast.error('An error occurred while changing the password');
      }
    } catch (error) {
      console.error('Error changing password', error);
      toast.error('An error occurred while changing the password');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePrivacy = () => {
    window.location.href = 'https://privacypolicy.realtorbots.ai/';
  };

  const handleNavigate = () => {
    navigate(PATH_PAGES.changepassword);
  };
  return (
    <>
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
            <Text className={classes.passwordtitle} onClick={handleNavigate}>
              Change Password
            </Text>
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
            placeholder="Enter new password"
            label="Enter new password"
            size="md"
            mb="md"
            w={'50%'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <PasswordInput
            placeholder="Confirm new password"
            label="Confirm new password"
            size="md"
            mb="md"
            w={'50%'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button size="md" color="blue" onClick={handleChangePassword} radius={'40px'} loading={isLoading}>
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
}
