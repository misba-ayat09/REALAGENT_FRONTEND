import React from 'react';
import { DateCellWrapperProps } from 'react-big-calendar';
import './dateCellWrapper.css';

const DateCellWrapper: React.FC<DateCellWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DateCellWrapper;
