import React, { useState, ChangeEvent, useEffect } from 'react';
import { Flex, TextInput, Input, Divider, ColorInput, LoadingOverlay, Text, Space } from '@mantine/core';
import { FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import SimpleButton from '../../../components/Button/SimpleButton';
import { CustomDropzone } from '../../../components/CustomDropzone';
import styles from './index.module.css';
import UploadedFileCard from '../../../components/Card/UploadedFileCard';
import { toast } from 'sonner';
import { FileCategory } from '../../../common/enum';
import FileService from '../../../api/services/FileService';
import { BrandingFormData } from '../../../api/types';
import { SocialMediaBrandingService } from '../../../api/services';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

enum FontFamily {
  Arial = 'arial',
  Cabal = 'cabal',
  Paul = 'paul',
  Shortbaby = 'shortbaby',
  Sansrounded = 'sansrounded',
  Carvingsoft = 'carvingsoft',
  Roboto = 'roboto',
  Boldfont = 'boldfont',
  Dragonhunter = 'dragonhunter',
}

const BrandSetupScreen: React.FC = () => {
  const [formData, setFormData] = useState<Partial<BrandingFormData>>({
    email: '',
    contactNumber: '',
    website: '',
    primaryColor: '',
    secondaryColor: '',
    logoImage: undefined,
    font: undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandingData = async () => {
      try {
        setIsFetching(true);
        const response = await SocialMediaBrandingService.getBrandingData();
        if (response && response.result) {
          const data = response.result;
          setFormData({
            email: data.email || '',
            contactNumber: data.contactNumber || '',
            website: data.website || '',
            primaryColor: data.primaryColor || '',
            secondaryColor: data.secondaryColor || '',
            logoImage: data.logoImage || undefined,
            font: data.font || undefined,
          });
        }
      } catch (error) {
        toast.error('Failed to fetch branding data');
      } finally {
        setIsFetching(false);
      }
    };

    fetchBrandingData();
  }, []);

  const handleInputChange = (field: keyof BrandingFormData, value: string | FileWithPath | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoDrop = (files: FileWithPath[]) => {
    if (files && files?.length > 0) {
      const file = files[0];

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const { width, height } = img;

        const maxWidth = 1280;
        const maxHeight = 853;

        if (width > maxWidth || height > maxHeight) {
          toast.warning(`Image exceeds maximum allowed dimensions of ${maxWidth}x${maxHeight}px.`);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        handleInputChange('logoImage', file);
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    }
  };

  const handleLogoDelete = () => {
    handleInputChange('logoImage', undefined);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name as keyof BrandingFormData, value);

    if (name === 'website') {
      const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
      if (value && !urlRegex.test(value)) {
        setWebsiteError('Invalid website URL');
      } else {
        setWebsiteError(null);
      }
    }

    // Validate email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
      if (value && !emailRegex.test(value)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError(null); // Clear error if valid
      }
    }

  };

  const handleSave = async () => {
    const parsedPhoneNumber = parsePhoneNumberFromString(formData.contactNumber || '');

    if (formData.email && emailError) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      toast.error('Please enter a valid phone number.');
      return; // Prevent form submission
    }

    // Basic URL validation regex
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

    if (!formData.primaryColor || !formData.secondaryColor || !formData.logoImage) {
      toast.warning('Please fill in required fields');
      return;
    }

    if (formData.website && !urlRegex.test(formData.website)) {
      toast.error('Please enter a valid website URL');
      return;
    }

    setLoading(true);

    const newFormData: Partial<BrandingFormData> = {
      ...formData,
    };

    try {
      if (formData.logoImage && typeof formData.logoImage !== 'string') {
        const fileFormData = new FormData();
        fileFormData.append('file', formData.logoImage);
        fileFormData.append('fileCategory', FileCategory.IMAGE);
        const response = await FileService.create(FileCategory.IMAGE, fileFormData);
        newFormData.logoImage = response?.result?.fileName;
      }

      await SocialMediaBrandingService.updateBrandingData(newFormData);
      toast.success('Branding updated successfully');
    } catch (error) {
      toast.error('Failed to update branding');
    } finally {
      setLoading(false);
    }
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontValue = event.target.value as FontFamily;
    handleInputChange('font', fontValue);
  };

  return (
    <Flex bg={'#FFFFFF'} px={16} pt={32} pb={16} className={'border-radius-top'} direction={'column'} gap={'24px'}>
      <Flex direction={'column'}>
        <Text className={styles.title}>Branding</Text>
        <Text className={styles.subTitle}>Add branding details for your social media posts</Text>
        <Space h={10} />
      </Flex>
      <Flex pos="relative">
        <Flex w={'45%'}>
          <Flex direction={'column'} gap={'24px'} w={'100%'} maw={'386px'}>
            <TextInput
              variant="filled"
              label="Email"
              name="email"
              placeholder="Enter email here"
              value={formData.email}
              onChange={handleTextChange}
              error={emailError}
              classNames={{ input: styles.textInputSmall }}
            />
            <TextInput
              variant="filled"
              label="Contact number"
              name="contactNumber"
              placeholder="Enter number here"
              value={formData.contactNumber}
              onChange={handleTextChange}
              classNames={{ input: styles.textInputSmall }}
            />
            <TextInput
              variant="filled"
              label="Website"
              name="website"
              placeholder="Enter website URL here"
              value={formData.website}
              onChange={handleTextChange}
              error={websiteError}
              classNames={{ input: styles.textInputSmall }}
            />
            {/* {websiteError && <Text color="red">{websiteError}</Text>} */}

            {/* <Select
              variant="filled"
              label="Font"
              name="font"
              data={fontDropdownOptions}
              placeholder="Select the font here"
              value={formData.font}
              onChange={(value) => handleInputChange('font', value ?? undefined)}
              classNames={{ input: styles.textInputSmall }}
            /> */}
            <div>
              <label htmlFor="font-dropdown" className={styles.label}>
                Font
              </label>
              <select id="font-dropdown" value={formData.font} onChange={handleFontChange} className={styles.select}>
                {Object.values(FontFamily).map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <ColorInput
              required
              variant="filled"
              label="Primary Color"
              placeholder="Enter primary color here"
              classNames={{ input: styles.textInputSmall }}
              withPicker
              value={formData.primaryColor}
              onChange={(value) => handleInputChange('primaryColor', value)}
              onChangeEnd={(value) => handleInputChange('primaryColor', value)}
            />
            <ColorInput
              required
              variant="filled"
              label="Secondary Color"
              placeholder="Enter secondary color here"
              classNames={{ input: styles.textInputSmall }}
              withPicker
              value={formData.secondaryColor}
              onChange={(value) => handleInputChange('secondaryColor', value)}
              onChangeEnd={(value) => handleInputChange('secondaryColor', value)}
            />

            <Input.Wrapper label="Logo" required>
              {!formData.logoImage ? (
                <CustomDropzone
                  fullWidth
                  maxFiles={1}
                  accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp, MIME_TYPES.avif]}
                  subTitle="Supported File Types: .jpeg, .png, .webp, .avif"
                  title='Drag and drop your logo here'
                  onDrop={handleLogoDrop}
                />
              ) : (
                <UploadedFileCard
                  fileName={typeof formData.logoImage === 'string' ? formData.logoImage : formData.logoImage.name}
                  onDelete={handleLogoDelete}
                  style={{ marginTop: '20px' }}
                />
              )}
            </Input.Wrapper>

            <div>
              <SimpleButton loading={loading} text="Save" mt={24} onClick={handleSave} />
            </div>
          </Flex>
        </Flex>

        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>

        <LoadingOverlay
          visible={isFetching}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'azureBlue', type: 'bars' }}
        />
      </Flex>
    </Flex>
  );
};

export default BrandSetupScreen;
