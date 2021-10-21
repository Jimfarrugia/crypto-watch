import Select from "react-select";
import { useTheme } from "styled-components";

const CustomSelect = ({ ...props }) => {
  const theme = useTheme();

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "0.9rem",
      background: "none",
      boxShadow: isFocused ? `0 0 0.25em ${theme.color.main.light}` : "none",
      borderColor: isFocused ? theme.color.main.light : theme.color.main.dark,
      "&:hover": {
        borderColor: theme.color.main.light,
        cursor: "pointer",
      },
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "0.9rem",
      textAlign: "left",
      backgroundColor: isFocused
        ? theme.color.main.light
        : theme.color.background,
      color: theme.color.text.main,
      borderBottom: `1px solid ${theme.color.main.dark}`,
      "&:hover": {
        backgroundColor: theme.color.main.light,
        color: theme.color.text.main,
        cursor: "pointer",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    }),
    menu: styles => ({
      ...styles,
      margin: 0,
      backgroundColor: theme.color.background,
      border: `1px solid ${theme.color.main.dark}`,
      borderTop: "none",
    }),
    input: styles => ({ ...styles, color: theme.color.main.light }),
    placeholder: styles => ({
      ...styles,
      color: theme.color.main.light,
      letterSpacing: "0.025rem",
    }),
    singleValue: styles => ({ ...styles, color: theme.color.main.dark }),
    dropdownIndicator: styles => ({ ...styles, color: theme.color.main.dark }),
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: theme.color.main.dark,
    }),
  };

  return <Select {...props} styles={selectStyles} />;
};

export default CustomSelect;
