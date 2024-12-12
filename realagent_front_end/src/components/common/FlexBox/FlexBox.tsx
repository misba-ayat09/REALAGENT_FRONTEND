import React, { ReactNode, CSSProperties, MouseEventHandler } from "react";

/**
 * A type representing various dimension values.
 */
type DimensionValue =
  | number
  | `${number}%`
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | string
  | undefined;

/**
 * Type representing possible flex container directions.
 */
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

/**
 * Type representing possible flex item alignments.
 */
type Alignment = "flex-start" | "flex-end" | "center" | "stretch";

/**
 * Type representing possible flex container justifications.
 */
type Justification =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Props for the FlexBox component.
 */
interface FlexBoxProps {
  /**
   * Additional CSS class name.
   */
  className?: string;

  /**
   * Indicates whether the component is a flex container. Default is false.
   */
  container?: boolean;

  /**
   * Defines the horizontal alignment of items in the container.
   */
  justifyContent?: Justification;

  /**
   * Defines the direction of the flex container.
   */
  flexDirection?: FlexDirection;

  /**
   * Specifies the proportion of space an item should take up.
   */
  flexGrow?: number;

  /**
   * Specifies the initial size of the flex item.
   */
  flexBasis?: DimensionValue;

  /**
   * Specifies how much a flex item will shrink.
   */
  flexShrink?: number;

  /**
   * Specifies whether flex items should wrap to a new line if necessary.
   */
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";

  /**
   * Shorthand for setting the `flex-grow`, `flex-shrink`, and `flex-basis` properties.
   */
  flex?: string;

  /**
   * Defines the vertical alignment of items in the container.
   */
  alignItems?: Alignment;

  /**
   * Defines the alignment of items when there's extra space in the container.
   */
  alignContent?: Alignment | "space-between" | "space-around";

  /**
   * Overrides the `align-items` value for a specific item.
   */
  alignSelf?: "auto" | Alignment;

  /**
   * Sets the margin around the component.
   */
  margin?: DimensionValue;

  /**
   * Sets the padding within the component.
   */
  padding?: DimensionValue;

  /**
   * Sets the width of the component.
   */
  width?: DimensionValue;

  /**
   * Sets the height of the component.
   */
  height?: DimensionValue;

  /**
   * Sets the minimum width of the component.
   */
  minWidth?: DimensionValue;

  /**
   * Sets the minimum height of the component.
   */
  minHeight?: DimensionValue;

  /**
   * Sets the maximum width of the component.
   */
  maxWidth?: DimensionValue;

  /**
   * Sets the maximum height of the component.
   */
  maxHeight?: DimensionValue;
  /**
   * Specifies the overflow behavior of the component.
   */
  overflow?: "visible" | "hidden" | "scroll" | "auto";

  /**
   * Adds a shadow to the component.
   */
  boxShadow?: string;

  /**
   * Sets the border radius of the component.
   */
  borderRadius?: DimensionValue;

  /**
   * Sets the background color of the component.
   */
  backgroundColor?: string;

  /**
   * Sets the background image of the component.
   */
  backgroundImage?: string;

  /**
   * Sets the text color of the component.
   */
  color?: string;

  /**
   * Custom CSS styles to apply to the component.
   */
  style?: CSSProperties;

  /**
   * Event handler for click events.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;

  /**
   * The content to be rendered within the FlexBox component.
   */
  children: ReactNode;
}

/**
 * A flexible container component that can be used to create layouts using CSS flexbox.
 * @param className - Additional CSS class name.
 * @param container - Indicates whether the component is a flex container.
 * @param justifyContent - Defines the horizontal alignment of items in the container.
 * @param flexDirection - Defines the direction of the flex container.
 * @param flexGrow - Specifies the proportion of space an item should take up.
 * @param flexBasis - Specifies the initial size of the flex item.
 * @param flexShrink - Specifies how much a flex item will shrink.
 * @param flexWrap - Specifies whether flex items should wrap to a new line if necessary.
 * @param flex - Shorthand for setting the `flex-grow`, `flex-shrink`, and `flex-basis` properties.
 * @param alignItems - Defines the vertical alignment of items in the container.
 * @param alignContent - Defines the alignment of items when there's extra space in the container.
 * @param alignSelf - Overrides the `align-items` value for a specific item.
 * @param margin - Sets the margin around the component.
 * @param padding - Sets the padding within the component.
 * @param width - Sets the width of the component.
 * @param height - Sets the height of the component.
 * @param minWidth - Sets the minimum width of the component.
 * @param minHeight - Sets the minimum height of the component.
 * @param maxWidth - Sets the maximum width of the component.
 * @param maxHeight - Sets the maximum height of the component.
 * @param overflow - Specifies the overflow behavior of the component.
 * @param boxShadow - Adds a shadow to the component.
 * @param borderRadius - Sets the border radius of the component.
 * @param backgroundColor - Sets the background color of the component.
 * @param backgroundImage - Sets the background image of the component.
 * @param color - Sets the text color of the component.
 * @param style - Custom CSS styles to apply to the component.
 * @param onClick - Event handler for click events.
 * @param children - The content to be rendered within the FlexBox component.
 */
const FlexBox: React.FC<FlexBoxProps> = ({
  className,
  container,
  justifyContent,
  flexDirection,
  flexGrow,
  flexBasis,
  flexShrink,
  flexWrap,
  flex,
  alignItems,
  alignContent,
  alignSelf,
  margin,
  padding,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  overflow,
  boxShadow,
  borderRadius,
  backgroundColor,
  backgroundImage,
  color,
  style,
  onClick,
  children,
}) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      display: container ? "flex" : "block",
      justifyContent,
      flexDirection,
      flexGrow,
      flexBasis,
      flexShrink,
      flexWrap,
      flex,
      alignItems,
      alignContent,
      alignSelf,
      margin,
      padding,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      overflow,
      boxShadow,
      borderRadius,
      backgroundColor,
      backgroundImage,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export { FlexBox };
