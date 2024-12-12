/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Box, Button, Divider, Flex, Input, LoadingOverlay, Modal, Text } from '@mantine/core';
import { DummyUser } from '../../assets';
import { IconType } from '../../components/common/Icons';
import { Icon } from '../../components/common/Icons/Icon';
import { useEffect, useState } from 'react';
import classes from './index.module.css';
import { ConnectedResponse, userApi } from '../../store/features/authentication/userApi';
import { fileHubAPI } from '../../store/features/fileHub/fileHubAPI';
import { FileCategory } from '../../common/enum';
import { useLoadingState } from '../../hooks';
import { toast } from 'sonner';
import { getConnectedAccounts, getUserData } from '../../store/features/authentication';
import { useAppDispatch, useAppSelector } from '../../store';
import { isValidUrl } from '../../utils/urlUtils';
import { useDisclosure } from '@mantine/hooks';
import SimpleButton from '../../components/Button/SimpleButton';
import { Config } from '../../config';
import { Slug } from '../../services';
// import { useNavigate } from 'react-router-dom';
// import { PATH_AUTH, PATH_DASHBOARD } from '../../router/route';

interface ProfileLocalState {
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  website: string;
  profilePicture: string;
}
const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const index = () => {
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState<ProfileLocalState>({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    website: '',
    profilePicture: '',
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const userData = useAppSelector((state) => state.authentication.userData);
  const connectedAccounts = useAppSelector((state) => state.authentication.connectedAccounts);

  useEffect(() => {
    const fetchAccountInformation = async () => {
      const profile = await userApi.fetchUserInfo();
      setProfile((prev) => ({
        ...prev,
        ...{
          firstName: profile?.result?.firstName ?? '',
          lastName: profile?.result?.lastName ?? '',
          location: profile?.result?.profile?.location ?? '',
          email: profile?.result?.email ?? '',
          website: profile?.result?.profile?.website ?? '',
          profilePicture: profile?.result?.profile?.profilePicture ?? '',
        },
      }));
      if (profile?.result?.profile?.profilePicture) {
        const response = await fileHubAPI.getAuthUrl(
          FileCategory.PROFILE_IMAGE,
          profile?.result?.profile?.profilePicture,
        );
        if (response?.result?.signedUrl) {
          setImageSrc(response?.result?.signedUrl);
        }
      }
    };
    fetchAccountInformation();
  }, []);
  // const navigate = useNavigate();
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [isImageUploading, startImageUploadingLoading, finishImageUploadingLoading] = useLoadingState();

  const [isEditing, setIsEdititing] = useState(false);

  const fetchAccountInformation = async () => {
    dispatch(getConnectedAccounts());
  };

  useEffect(() => {
    fetchAccountInformation();
  }, []);

  const handleSave = async () => {
    try {
      startLoading();
      const isWebsiteValid = isValidUrl(profile.website);
      if (!isWebsiteValid) {
        setProfile((prev) => ({ ...prev, website: '' }));
        return toast.error('Please enter a valid website URL');
      }
      await userApi.updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        location: profile.location,
        website: profile.website,
        profilePicture: profile.profilePicture,        
      });
    } catch (error) {
      //
    } finally {
      setIsEdititing(!isEditing);
      finishLoading();
      dispatch(getUserData());
    }
  };

  // const handleError = () => {
  //   navigate(PATH_DASHBOARD.nothingfound);
  // };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    startImageUploadingLoading();
    const { files } = e.target;

    if (!files || files?.length === 0) {
      toast.error('No image files selected!');
      finishImageUploadingLoading();
      return;
    }

    const validImageFiles = Array.from(files).filter((file) => file.type.match(imageTypeRegex));

    if (validImageFiles?.length === 0) {
      toast.error('Selected image is not of a valid type!');
      finishImageUploadingLoading();
      return;
    }

    const selectedFile = validImageFiles[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('fileCategory', FileCategory.PROFILE_IMAGE);

    try {
      const response = await fileHubAPI.uploadFile(FileCategory.PROFILE_IMAGE, formData);
      if (response?.result?.fileName) {
        setProfile((prev) => ({
          ...prev,
          profilePicture: response.result.fileName,
        }));

        const authUrlResponse = await fileHubAPI.getAuthUrl(FileCategory.PROFILE_IMAGE, response.result.fileName);
        if (authUrlResponse?.result?.signedUrl) {
          setImageSrc(authUrlResponse.result.signedUrl);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.');
    } finally {
      finishImageUploadingLoading();
    }
  };

  const handleOnPressConnect = () => {
    const userId = userData.userId;
    const url = Config.API_URL + Slug.AYRSHARE_CONNECT + `?userId=${userId}`;
    const windowFeatures = 'width=600,height=700,left=200,top=100';
    const newWindow = window.open(url, '_blank', windowFeatures);

    if (newWindow) {
      newWindow.opener = null;
      newWindow.focus();
    }
  };

  return (
    <>
      <Flex justify={'flex-start'} direction={'column'} gap={10} bg={'white'} p={20}>
        <Text fw={600} fz={24}>
          Profile
        </Text>
        <Flex align={'flex-start'} justify={'space-between'}>
          <Flex>
            {isEditing ? (
              <Box pos="relative">
                <Avatar
                  className={classes.avatar}
                  src={imageSrc || DummyUser}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const fileInput = document.getElementById('image-upload') as HTMLInputElement | null;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                />
                <label htmlFor="image-upload" style={{ display: 'none' }}></label>
                <input
                  type="file"
                  id="image-upload"
                  onChange={changeHandler}
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: 'none' }}
                />
                <LoadingOverlay visible={isImageUploading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                <Icon
                  icon={IconType.edit}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '5px',
                    cursor: 'pointer',
                    width: '44px',
                    height: '44px',
                  }}
                  onPress={() => {
                    const fileInput = document.getElementById('image-upload') as HTMLInputElement | null;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                />
              </Box>
            ) : (
              <Avatar className={classes.avatar} src={imageSrc || DummyUser} />
            )}
          </Flex>
          {isLoading || isEditing ? (
            <Button style={{ backgroundColor: '#007BFF' }} loading={isLoading} onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Icon icon={IconType.edit} onPress={() => setIsEdititing(true)} style={{ width: '44px', height: '44px' }} />
          )}
        </Flex>
        {isEditing ? (
          <UpdateUserProfileFields setState={setProfile} state={profile} />
        ) : (
          <>
            <Text fw={500} fz={24}>
              {profile.firstName + ' ' + profile.lastName}
            </Text>
            <Text fw={400} fz={16}>
              {profile.location}
            </Text>
            <Flex gap={10} direction={'row'}>
              <Text fw={600} fz={16}>
                Email:{' '}
              </Text>
              <Text fw={400} fz={16}>
                {profile.email}
              </Text>
            </Flex>
            <Flex gap={10} direction={'row'}>
              <Text fw={600} fz={16}>
                Website:{' '}
              </Text>
              <Text fw={400} fz={16}>
                {profile.website}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
      <Text mt={10} fz={16} fw={600}>
        Link Social Media Accounts
      </Text>

      <Flex
        p={'20px 20px'}
        w={'100%'}
        direction={'column'}
        align={'flex-start'}
        justify={'flex-start'}
        mih={88}
        bg={'#FFFFFF'}
        mt={10}>
        <SimpleButton text="Connect" onClick={handleOnPressConnect} />

        {connectedAccounts && connectedAccounts?.length > 0 ? (
          <Box w={'100%'} py={16}>
            <Divider c={'#DCE5EA'} size={'2px'} />
          </Box>
        ) : null}

        <Flex align={'center'} justify={'flex-start'} gap={10}>
          {connectedAccounts.map((item, index) => (
            <ConnectedAccounts key={index} {...item} fetchAccountInformation={fetchAccountInformation} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

const ConnectedAccounts: React.FC<ConnectedResponse> = (props) => {
  const { label, username, icon, alreadyConnected, redirectUrl, fetchAccountInformation } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const handleRedirect = () => {
    return () => {
      if (alreadyConnected) {
        open();
        return null;
      }

      window.location.replace(redirectUrl);
    };
  };
  const handleDisconnect = (label: string) => {
    return async () => {
      try {
        if (icon === IconType.google) {
          await userApi.disconnectAccounts(label);
        } else {
          await userApi.disconnectAyrAccount(icon);
        }
        fetchAccountInformation();
        close();
      } catch (error) {
        close();
      }
    };
  };
  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Are you sure want to disconnect?">
        <Flex align={'center'} justify={'center'}>
          <Button mt={10} onClick={handleDisconnect(label)} color="red" mx={3}>
            Yes
          </Button>
          <Button mt={10} onClick={close}>
            No
          </Button>
        </Flex>

        {/* Modal content */}
      </Modal>
      <Flex mr={30} align={'center'} justify={'center'} gap={10} aria-disabled={alreadyConnected} onClick={handleRedirect()}>
        <Icon style={{ width: '32px', height: '32px', marginTop: 10 }} icon={icon} />
        <Flex direction={'column'} align={'start'} justify={'center'} gap={0}>
          <Text fz={16} fw={400}>
            {label}
          </Text>
          <Text mt={-5} fz={12} c={'#ACACAC'} fw={400}>
            {alreadyConnected ? username : 'Connect'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const UpdateUserProfileFields: React.FC<{
  setState: React.Dispatch<React.SetStateAction<ProfileLocalState>>;
  state: ProfileLocalState;
}> = (props) => {
  const { state, setState } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Input
        classNames={classes}
        styles={{ section: { display: 'block', width: 40 } }}
        name="firstName"
        placeholder="First Name"
        value={state.firstName}
        onChange={handleChange}
      />
      <Input
        classNames={classes}
        styles={{ section: { display: 'block', width: 40 } }}
        name="lastName"
        placeholder="Last Name"
        value={state.lastName}
        onChange={handleChange}
      />
      <Input
        classNames={classes}
        name="location"
        placeholder="location"
        value={state.location}
        onChange={handleChange}
      />
      <Input
        classNames={classes}
        name="email"
        disabled
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      />
      <Input classNames={classes} name="website" placeholder="website" value={state.website} onChange={handleChange} />
    </>
  );
};

export default index;
