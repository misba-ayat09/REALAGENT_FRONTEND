import classes from './Header.module.css';
import { SpotlightSearch } from './SpotlightSearch/SpotlightSearch';
import { NotificationDropdown } from './NotificationDropdown/NotificationDropdown';
import { Flex} from '@mantine/core';
import { SpotlightSearchIcon } from './SpotlightSearchIcon/SpotlightSearchIcon';
import { spotlightActions } from './spotlightActions';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '../common/UserMenu/UserMenu';
import { logout } from '../../store/features/authentication';
import { useAppDispatch, useAppSelector } from '../../store';
import { Logo } from '../../assets';
import { scalar } from '../../helper';
import { PATH_PAGES } from '../../router/route';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.authentication.userData);

  return (
    <header className={classes.header}>
      <Flex gap={'xs'}>
        <img
          style={{ width: scalar(156), height: scalar(50) }}
          src={Logo}
          alt="logo"
          onClick={() => {
            navigate(PATH_PAGES.botViewer);
          }}
        />
      </Flex>

      <SpotlightSearch actions={spotlightActions(navigate)} />

      <Flex
        classNames={{
          root: classes.iconsContainer,
        }}>
        <SpotlightSearchIcon />
        <NotificationDropdown />
        <UserMenu
          onLogout={() => {
            dispatch(logout());
          }}
          user={{
            firstName: userData.firstName ?? '',
            lastName: userData.lastName ?? '',
            email: userData.email ?? '',
            image: userData.profilePicture ?? '',
          }}
          isTextVisible={false}
        />
      </Flex>
    </header>
  );
};

export default Header;
