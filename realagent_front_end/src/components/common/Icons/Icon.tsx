import React from 'react';
import classes from './icon.module.css';
import cx from 'clsx';
import { IconType, icons } from '.';
import { Box } from '@mantine/core';

/**
 * Merge multiple CSS styles into one.
 * @param styles - An array of CSS styles to merge.
 * @returns A single CSS style object containing the merged styles.
 */
const mergeStyles = (...styles: (React.CSSProperties | undefined)[]) => {
  return styles.reduce((acc, style) => {
    if (style) {
      return { ...acc, ...style };
    }
    return acc;
  }, {});
};

/**
 * Default CSS styles for an icon.
 */
const iconStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
};

/**
 * Props for the Image component.
 */
interface ImageProps {
  /**
   * Custom CSS styles for the image.
   */
  style?: React.CSSProperties;

  /**
   * The source URL of the image.
   */
  source: string;

  isAction?: boolean;
}

/**
 * A component for displaying an image.
 * @param style - Custom CSS styles for the image.
 * @param source - The source URL of the image.
 */
const IconImage: React.FC<ImageProps> = ({ style, source, isAction = false }) => (
  <img
    style={mergeStyles(iconStyle, style)}
    src={source}
    alt="icon"
    className={cx({ [classes.iconCursor]: isAction })}
  />
);

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /**
   * Event handler for button click.
   */
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;

  /**
   * Custom CSS styles for the button.
   */
  style?: React.CSSProperties;

  /**
   * Additional CSS class name for the button.
   */
  className?: string;

  /**
   * The content to be displayed within the button.
   */
  children: React.ReactNode;

  isAction?: boolean;
}

/**
 * A button component.
 * @param onClick - Event handler for button click.
 * @param style - Custom CSS styles for the button.
 * @param className - Additional CSS class name for the button.
 * @param children - The content to be displayed within the button.
 */
const Button: React.FC<ButtonProps> = ({ onClick, style, className, children, isAction = true }) => (
  <button
    className={cx(className, { [classes.iconCursor]: isAction })}
    onClick={onClick}
    type={'button'}
    style={{
      ...style,
      cursor: onClick || isAction ? 'pointer' : 'not-allowed',
      border: 'none',
      background: 'transparent',
    }}>
    {children}
  </button>
);

/**
 * Props for the Icon component.
 */
// interface IconProps {
//   /**
//    * Custom CSS styles for the icon.
//    */
//   style?: React.CSSProperties;

//   /**
//    * The color of the icon.
//    */
//   color?: string;

//   /**
//    * The type of icon to display.
//    */
//   icon?: IconType;

//   /**
//    * Additional CSS class name for the icon container.
//    */
//   containerClassName?: string;

//   /**
//    * Custom CSS styles for the icon container.
//    */
//   containerStyle?: React.CSSProperties;

//   /**
//    * Event handler for when the icon is clicked.
//    */
//   onPress?: React.MouseEventHandler<HTMLButtonElement> | undefined;

//   /**
//    * Event handler for when the icon is clicked.
//    */
//   onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

//   isAction?: boolean;
// }

// /**
//  * An icon component that displays an image.
//  * @param style - Custom CSS styles for the icon.
//  * @param color - The color of the icon.
//  * @param icon - The type of icon to display.
//  * @param containerClassName - Additional CSS class name for the icon container.
//  * @param containerStyle - Custom CSS styles for the icon container.
//  * @param onPress - Event handler for when the icon is clicked.
//  */
// export const Icon: React.FC<IconProps> = ({
//   style: styleOverride,
//   icon,
//   containerClassName,
//   containerStyle,
//   onPress,
//   onClick,
//   isAction = true,
// }) => {
//   return isAction || onPress || onClick ? (
//     <Button className={containerClassName} style={containerStyle} onClick={onPress || onClick} isAction={isAction}>
//       {icon && <IconImage style={styleOverride} source={icons[icon]} isAction={isAction} />}
//     </Button>
//   ) : (
//     <Box className={containerClassName} style={containerStyle}>
//       {icon && <IconImage style={styleOverride} source={icons[icon]} isAction={isAction} />}
//     </Box>
//   );
// };
interface IconProps {
  icon: IconType;
  size?: number; // Ensure size is optional and defined as a number
  style?: React.CSSProperties;
  color?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isAction?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 24, // Default size to 24px
  style,
  color,
  containerClassName,
  containerStyle,
  onClick,
  isAction = true,
}) => {
  const iconStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    fill: color || "currentColor",
    ...style,
  };

  const iconSource = icons[icon]; // Your icon source mapping

  return isAction ? (
    <button
      className={containerClassName}
      onClick={onClick}
      type="button"
      style={{
        ...containerStyle,
        cursor: onClick ? "pointer" : "default",
        border: "none",
        background: "transparent",
      }}
    >
      <img src={iconSource} alt={`${icon} icon`} style={iconStyle} />
    </button>
  ) : (
    <Box className={containerClassName} style={containerStyle}>
      <img src={iconSource} alt={`${icon} icon`} style={iconStyle} />
    </Box>
  );
};

