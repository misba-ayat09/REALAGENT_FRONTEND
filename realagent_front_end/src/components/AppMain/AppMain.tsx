import { ReactNode } from "react";
import { Box, MantineStyleProps } from "@mantine/core";
import classes from "./App.module.css";

interface AppMainProps extends MantineStyleProps {
  children: ReactNode;
}

const AppMain: React.FC<AppMainProps> = ({ children, ...rest }) => {
  return (
    <Box {...rest} className={classes.main}>
      {children}
    </Box>
  );
};

export default AppMain;
