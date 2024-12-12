import React, { useState, ChangeEvent, useEffect } from 'react';
import { Flex, TextInput, Input, Divider, Loader, Text, Space, Modal } from '@mantine/core';
import { FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import SimpleButton from '../../../components/Button/SimpleButton';
import { CustomDropzone } from '../../../components/CustomDropzone';
import styles from './index.module.css';
import UploadedFileCard from '../../../components/Card/UploadedFileCard';
import { toast } from 'sonner';
import { TemplateFormData } from '../../../api/types';
import { FileService, SocialMediaBrandingService } from '../../../api/services';
import { FileCategory } from '../../../common/enum';
import { Config } from '../../../config';
import { useDisclosure } from '@mantine/hooks';

const layoutsToLoad = [1, 2, 3, 4];
const TemplateGenerationScreen: React.FC = () => {
  const [formData, setFormData] = useState<TemplateFormData>({
    price: '',
    mainText: '',
    subText: '',
    features: '',
    baseImage: undefined,
    additionalImage: undefined,
    layout: '',
    location: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [layoutImages, setLayoutImages] = useState<string[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isModalOpen, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchLayouts = async () => {
      setLoading(true);
      try {
        const imagePromises = layoutsToLoad.map((layoutNumber) => SocialMediaBrandingService.getLayout(layoutNumber));
        const layoutResponses = await Promise.all(imagePromises);
        const images = layoutResponses
          .filter((response): response is { url: string } => response !== undefined)
          .map((response) => Config.SM_BASE_URL + response.url);
        setLayoutImages(images);
      } catch (error) {
        toast.error('Failed to load layout images');
      } finally {
        setLoading(false);
      }
    };

    fetchLayouts();
  }, []);

  const handleInputChange = (field: keyof TemplateFormData, value: string | FileWithPath | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const priceRegex = /^\$?\d*\.?\d*$/;
      if (!priceRegex.test(value)) {
        return;
      }
    }
    if (name === 'mainText') {
      const sentenceRegex = /^[A-Za-z0-9\s,;.!?]+$/;
      if (!sentenceRegex.test(value)) {
        toast.error('Please provide a valid sentence or phrase');
        return;
      }
    }
    if (name === 'location') {
      const locationRegex = /^[a-zA-Z\s,-]*$/;
      if (!locationRegex.test(value)) {
        toast.error('Please enter a valid location name');
        return;
      }
    }
    if (name === 'features') {
      const featuresRegex = /^[a-zA-Z\s,-8]*$/;
      if (!featuresRegex.test(value)) {
        toast.error('Please enter a valid features name');
        return;
      }
    }
    handleInputChange(name as keyof TemplateFormData, value);
  };

  const handleLayoutSelect = (layoutNumber: number) => {
    setSelectedLayout(layoutNumber);
    handleInputChange('layout', layoutNumber.toString());
  };

  const handleGenerateTemplate = async () => {
    if (!formData.mainText || !formData.baseImage || !formData.additionalImage || !formData.layout) {
      toast.warning('Please fill in all fields and upload images');
      return;
    }
    setLoading(true);
    const newFormData = new FormData();
    if (formData.price) newFormData.append('price', formData.price);
    newFormData.append('mainText', formData.mainText);
    if (formData.subText) newFormData.append('subText', formData.subText);
    if (formData.features) newFormData.append('features', formData.features);
    newFormData.append('layout', formData.layout);
    if (formData.location) newFormData.append('location', formData.location);
    if (formData.baseImage) newFormData.append('baseImage', formData.baseImage);
    if (formData.additionalImage) newFormData.append('additionalImage', formData.additionalImage);

    try {
      const response = await SocialMediaBrandingService.generateTemplate(newFormData);
      if (response?.result && response.result.image) {
        toast.success('Template generated successfully');
        const imageResponse = await FileService.findOne(FileCategory.IMAGE, response.result.image);
        if (imageResponse?.result && imageResponse.result?.signedUrl) {
          setGeneratedImage(imageResponse.result.signedUrl);
          open();
        }
      } else {
        toast.error('Template generation failed');
      }
    } catch (error) {
      toast.error('Failed to generate template');
    } finally {
      setLoading(false);
    }
  };
  const handleBaseImageDelete = () => {
    setFormData((prev) => ({ ...prev, baseImage: undefined }));
  };
  const handleBaseImageDrop = (files: FileWithPath[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      handleInputChange('baseImage', file);
    }
  };
  const handleAdditionalImagesDrop = (files: FileWithPath[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      handleInputChange('additionalImage', file);
    }
  };
  const handleAdditionalImagesDelete = () => {
    handleInputChange('additionalImage', undefined);
  };

  return (
    <Flex
      bg={'#FFFFFF'}
      px={16}
      pt={32}
      pb={16}
      className={'border-radius-top'}
      direction={'column'}
      gap={'24px'}
      w={'100%'}>
      <Flex direction={'column'}>
        <Text className={styles.title}>Template Generation</Text>
        <Text className={styles.subTitle}>Generate your social media template</Text>
        <Space h={10} />
      </Flex>
      <Flex pos="relative">
        <Flex direction={'column'} gap={'24px'} w={'100%'} maw={'386px'}>
          <TextInput
            variant="filled"
            label="Price"
            name="price"
            placeholder="Enter price here"
            value={formData.price}
            onChange={handleTextChange}
            classNames={{ input: styles.textInputSmall }}
          />
          <TextInput
            required
            variant="filled"
            label="Main Text"
            name="mainText"
            placeholder="Enter the main text here"
            value={formData.mainText}
            onChange={handleTextChange}
            classNames={{ input: styles.textInputSmall }}
          />
          <TextInput
            variant="filled"
            label="Sub Text"
            name="subText"
            placeholder="Enter the sub text here"
            value={formData.subText}
            onChange={handleTextChange}
            classNames={{ input: styles.textInputSmall }}
          />
          <TextInput
            variant="filled"
            label="Features"
            name="features"
            placeholder="Enter features here"
            value={formData.features}
            onChange={handleTextChange}
            classNames={{ input: styles.textInputSmall }}
          />
          <TextInput
            variant="filled"
            label="Location"
            name="location"
            placeholder="Enter location here"
            value={formData.location}
            onChange={handleTextChange}
            classNames={{ input: styles.textInputSmall }}
          />

          <Input.Wrapper label="Base Image" required>
            {!formData.baseImage ? (
              <CustomDropzone
                fullWidth
                maxFiles={1}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp, MIME_TYPES.avif]}
                subTitle="Supported File Types: .jpg, .jpeg, .png, .webp, .avif"
                title="Drop image here or click to upload"
                onDrop={handleBaseImageDrop}
              />
            ) : (
              <UploadedFileCard
                fileName={formData.baseImage?.name}
                onDelete={handleBaseImageDelete}
                style={{ marginTop: '20px' }}
              />
            )}
          </Input.Wrapper>

          <Input.Wrapper label="Additional Image" required>
            {!formData.additionalImage ? (
              <CustomDropzone
                fullWidth
                maxFiles={1}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp]}
                subTitle="Supported File Types: .jpg, .jpeg, .png, .webp"
                title="Drop image here or click to upload"
                onDrop={handleAdditionalImagesDrop}
              />
            ) : (
              <UploadedFileCard
                fileName={formData.additionalImage?.name}
                onDelete={handleAdditionalImagesDelete}
                style={{ marginTop: '20px' }}
              />
            )}
          </Input.Wrapper>
          <div>
            <SimpleButton loading={loading} text="Generate Template" mt={24} onClick={handleGenerateTemplate} />
          </div>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex direction="column" pos="relative" gap="16px">
          <Text fw={500} size="sm">
            Choose Layout <span style={{ color: 'red' }}>*</span>
          </Text>
          {loading ? (
            <Loader />
          ) : layoutImages.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}>
              {layoutImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Layout ${index + 1}`}
                  style={{
                    maxWidth: '400px',
                    border:
                      selectedLayout === index + 1 ? '3px solid var(--mantine-color-blue-6)' : '3px solid transparent',
                    cursor: 'pointer',
                    height: 'auto',
                  }}
                  onClick={() => handleLayoutSelect(index + 1)}
                />
              ))}
            </div>
          ) : (
            <Text>No layouts available</Text>
          )}
        </Flex>
        <Modal opened={isModalOpen} onClose={close} size="lg" title="Generated Template">
          <img src={generatedImage ?? ''} alt="Generated Template" />
        </Modal>
      </Flex>
    </Flex>
  );
};

export default TemplateGenerationScreen;
