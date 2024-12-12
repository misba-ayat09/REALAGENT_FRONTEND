import React, { useState, useEffect } from 'react';
import { NoImageFound } from '../../../../assets';
import { LoadingOverlay } from '@mantine/core';

interface ImageProps {
  src?: string;
  backdropImg?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = React.memo(
  ({ src, backdropImg = NoImageFound, alt, width = '100px', height = '100px', className, onClick }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      if (src) {
        setImageUrl(src);
        setIsLoading(false);
      } else {
        setImageUrl(backdropImg);
        setIsLoading(false);
      }
    }, [src, backdropImg]);

    const handleImageLoad = () => {
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
          }}
          onClick={onClick}
        />
      </div>
    );
  },
);

export default Image;
