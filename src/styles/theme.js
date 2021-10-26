import { colors } from "../constants";

export const light = {
  color: {
    main: {
      light: colors.purpleBright,
      dark: colors.purple,
    },
    secondary: {
      light: colors.blueBright,
      dark: colors.blue,
    },
    error: {
      light: colors.red,
      dark: colors.redDark,
    },
    success: {
      light: colors.green,
      dark: colors.greenDark,
    },
    text: {
      main: colors.black,
      secondary: colors.grayDark,
      link: colors.purpleBright,
      hover: colors.purple,
    },
    highlight: colors.yellow,
    background: colors.white,
    disabled: colors.gray,
  },
  font: {
    main: `"Ubuntu", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
			"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    mono: `"Ubuntu Mono", "Courier New", monospace`,
  },
};

export const dark = {
  color: {
    main: {
      light: colors.purpleBright,
      dark: colors.purple,
    },
    secondary: {
      light: colors.blueBright,
      dark: colors.blue,
    },
    error: {
      light: colors.red,
      dark: colors.redDark,
    },
    success: {
      light: colors.green,
      dark: colors.greenDark,
    },
    text: {
      main: colors.white,
      secondary: colors.gray,
      link: colors.purpleBright,
      hover: colors.purple,
    },
    highlight: colors.yellow,
    background: colors.black,
    disabled: colors.grayDark,
  },
  font: {
    main: `"Ubuntu", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
			"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    mono: `"Ubuntu Mono", "Courier New", monospace`,
  },
};
