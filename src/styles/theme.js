import { colors } from "../constants";

export const light = {};

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
};
