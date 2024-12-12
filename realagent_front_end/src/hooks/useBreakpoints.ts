import { useMediaQuery } from "@mantine/hooks";
import { theme } from "../theme";
import { MantineBreakpointsValues } from "@mantine/core";

const defaultBreakpoints: MantineBreakpointsValues = {
  xs: "30em",
  sm: "48em",
  md: "64em",
  lg: "74em",
  xl: "90em",
};

const useBreakpoints = (
  customBreakpoints?: Partial<MantineBreakpointsValues>
) => {
  const breakpoints = {
    ...defaultBreakpoints,
    ...theme.breakpoints,
    ...customBreakpoints,
  };

  const isXs = useMediaQuery(`(min-width: ${breakpoints.xs})`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl})`);

  return { isXs, isSm, isMd, isLg, isXl };
};

export default useBreakpoints;
