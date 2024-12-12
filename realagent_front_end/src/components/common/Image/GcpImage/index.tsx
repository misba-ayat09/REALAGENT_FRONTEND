import React, { useState, useEffect } from 'react';
import { FileService } from '../../../../api/services';
import { FileCategory } from '../../../../common/enum';
import { NoImageFound } from '../../../../assets';
import { LoadingOverlay } from '@mantine/core';

interface GcpImageProps {
  file?: {
    fileName?: string;
    fileCategory?: FileCategory;
  };
  src?: string;
  backdropImg?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

const GcpImage: React.FC<GcpImageProps> = React.memo(
  ({ file = {}, src, backdropImg = NoImageFound, alt, width = '100px', height = '40px', className, onClick }) => {
    const { fileName, fileCategory = FileCategory.IMAGE } = file;
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isValidUrl = (url: string): boolean => {
      const urlRegex = /^(https?:\/\/)/;
      return urlRegex.test(url);
    };

    useEffect(() => {
      if (src) {
        // setIsLoading(true);
        setImageUrl(src);
        // setIsLoading(false);
      } else if (fileName && isValidUrl(fileName)) {
        // setIsLoading(true);
        setImageUrl(fileName);
        // setIsLoading(false);
      } else if (fileName) {
        // setIsLoading(true);
        const url = FileService.getStreamUrl(fileCategory, fileName);
        setImageUrl(url);
      } else {
        // setIsLoading(true);
        setImageUrl(backdropImg);
        // setIsLoading(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }, [src, fileName, fileCategory, backdropImg]);

    const handleImageLoad = () => {
      console.warn('first Handle image load::::::');
      setIsLoading(false);
    };

    const handleImageError = () => {
      setImageUrl(backdropImg);
      setIsLoading(false);
    };

    return (
      <div
        style={{
          position: 'relative',
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
        className={className}>
        {isLoading && <LoadingOverlay visible />}

        <img
          src={imageUrl || backdropImg}
          alt={alt}
          width={typeof width === 'number' ? `${width}px` : width}
          height={typeof height === 'number' ? `${height}px` : height}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            display: isLoading ? 'none' : 'block',
            cursor: onClick ? 'pointer' : 'default',
            borderRadius: '5px',
            objectFit: 'cover',
          }}
          onClick={onClick}
        />
      </div>
    );
  },
);

export default GcpImage;
