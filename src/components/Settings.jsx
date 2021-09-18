import Select from "react-select";
import { currencies, timeframes, color } from "../constants";

const { black, white, purple, purpleBright } = color;

const selectStyles = {
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
  menu: (styles) => ({
    ...styles,
    margin: 0,
    backgroundColor: black,
    border: `1px solid ${purple}`,
    borderTop: "none",
  }),
  input: (styles) => ({ ...styles, color: purpleBright }),
  placeholder: (styles) => ({ ...styles, color: purple }),
  singleValue: (styles) => ({ ...styles, color: purple }),
  dropdownIndicator: (styles) => ({ ...styles, color: purple }),
  indicatorSeparator: (styles) => ({ ...styles, backgroundColor: purple }),
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
