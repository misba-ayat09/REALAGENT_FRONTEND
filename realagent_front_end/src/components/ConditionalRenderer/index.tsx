import React, { ReactNode } from "react";

interface Props {
  param1: number | string;
  param2: number | string | (number | string)[];
  children: ReactNode;
}

const CondRenderer: React.FC<Props> = ({ param1, param2, children }) => {
  const areParamsEqual = Array.isArray(param2) ? param2.includes(param1) : param1 === param2;

  return areParamsEqual ? <>{children}</> : null;
};

export default CondRenderer;
