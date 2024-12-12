import { Flex, Text } from '@mantine/core';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import classes from './general.module.css';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGES } from '../../../router/route';

export default function GeneralSection() {
  const navigate = useNavigate();
  const handleChangePassword = () => {
    navigate(PATH_PAGES.changepassword);
  };
  const handlePrivacy = () => {
    window.location.href = 'https://privacypolicy.realtorbots.ai/';
  };
  return (
    <div className={classes.container}>
      <Flex
        style={{
          cursor: 'pointer',
          gap: '20px',
        }}>
        <Icon icon={IconType.Key} />
        <Text className={classes.passwordtitle} onClick={handleChangePassword}>
          Change Password
        </Text>
      </Flex>
      <Flex
        style={{
          cursor: 'pointer',
          gap: '20px',
        }}>
        <Icon icon={IconType.privacyIcon} />
        <Text
          className={classes.passwordtitle}
          onClick={() => {
            handlePrivacy();
          }}>
          Privacy policy
        </Text>
      </Flex>
    </div>
  );
}
