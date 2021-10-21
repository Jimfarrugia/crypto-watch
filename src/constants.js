export const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const coinNavLength = 10;

export const currencies = [
  { label: "USD", value: "usd" },
  { label: "AUD", value: "aud" },
  { label: "CAD", value: "cad" },
  { label: "CHF", value: "chf" },
  { label: "CNY", value: "cny" },
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
  { label: "JPY", value: "jpy" },
  { label: "KRW", value: "krw" },
  { label: "NOK", value: "nok" },
  { label: "NZD", value: "nzd" },
];

export const timeframes = [
  { label: "7 Days", value: 7 },
  { label: "14 Days", value: 14 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "12 Months", value: 365 },
];

export const colors = {
  black: "#0e0b16",
  gray: "#777777",
  grayDark: "#444444",
  white: "#e7dfdd",
  purple: "#813772",
  purpleBright: "#a239ca",
  blue: "#062f4f",
  blueBright: "#4717f6",
  red: "#ff0a0a",
  redDark: "#b30606",
  green: "#1aff1a",
  greenDark: "#008800",
  yellow: "#feff01",
};

const { black, white, purple, purpleBright } = colors;

export const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    fontSize: "0.9rem",
    background: "none",
    boxShadow: isFocused ? `0 0 0.25em ${purpleBright}` : "none",
    borderColor: isFocused ? purpleBright : purple,
    "&:hover": {
      borderColor: purpleBright,
      cursor: "pointer",
    },
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    fontSize: "0.9rem",
    textAlign: "left",
    backgroundColor: isFocused ? purpleBright : black,
    color: white,
    borderBottom: `1px solid ${purple}`,
    "&:hover": {
      backgroundColor: purpleBright,
      color: white,
      cursor: "pointer",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  }),
  menu: styles => ({
    ...styles,
    margin: 0,
    backgroundColor: black,
    border: `1px solid ${purple}`,
    borderTop: "none",
  }),
  input: styles => ({ ...styles, color: purpleBright }),
  placeholder: styles => ({
    ...styles,
    color: purpleBright,
    letterSpacing: "0.025rem",
  }),
  singleValue: styles => ({ ...styles, color: purple }),
  dropdownIndicator: styles => ({ ...styles, color: purple }),
  indicatorSeparator: styles => ({ ...styles, backgroundColor: purple }),
};
