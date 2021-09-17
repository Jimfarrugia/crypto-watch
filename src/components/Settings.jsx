import Select from "react-select";
import { currencies, timeframes } from "../constants";

const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    fontSize: "0.9rem",
    background: "none",
    boxShadow: isFocused ? "0 0 0.25em #a239ca" : "none",
    borderColor: isFocused ? "#a239ca" : "#813772",
    "&:hover": {
      borderColor: "#a239ca",
      cursor: "pointer",
    },
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    fontSize: "0.9rem",
    backgroundColor: isFocused ? "#a239ca" : "#0e0b16",
    color: "#e7dfdd",
    borderBottom: "1px solid #813772",
    "&:hover": {
      backgroundColor: "#a239ca",
      color: "#e7dfdd",
      cursor: "pointer",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  }),
  input: (styles) => ({
    ...styles,
    color: "#a239ca",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#813772",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#813772",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "#813772",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "#813772",
  }),
  menu: (styles) => ({
    ...styles,
    margin: 0,
    backgroundColor: "#0e0b16",
    border: "1px solid #813772",
    borderTop: "none",
  }),
};

const Settings = ({
  vsCurrency,
  priceHistoryDays,
  handleChangePriceHistoryDays,
  handleChangeVsCurrency,
}) => {
  return (
    <div className="settings">
      <div className="currency">
        <Select
          isSearchable={false}
          options={currencies}
          styles={selectStyles}
          placeholder={vsCurrency.toUpperCase()}
          onChange={handleChangeVsCurrency}
        />
      </div>
      <div className="timeframe">
        <Select
          isSearchable={false}
          options={timeframes}
          styles={selectStyles}
          placeholder={priceHistoryDays.label}
          onChange={handleChangePriceHistoryDays}
        />
      </div>
    </div>
  );
};

export default Settings;
