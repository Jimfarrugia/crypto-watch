import Select from "react-select";

const currencies = [
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

const timeframes = [
  { label: "7 Days", value: 7 },
  { label: "14 Days", value: 14 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "12 Months", value: 365 },
];

const selectStyles = {
  control: (styles) => ({
    ...styles,
    fontSize: "0.9rem",
    background: "none",
    borderColor: "#813772",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#a239ca",
    },
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    fontSize: "0.9rem",
    backgroundColor: isSelected ? "#813772" : "#e7dfdd",
    color: isSelected ? "#e7dfdd" : "#0e0b16",
    "&:hover": {
      backgroundColor: "#a239ca",
      color: "#e7dfdd",
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
          options={currencies}
          styles={selectStyles}
          placeholder={vsCurrency.toUpperCase()}
          onChange={handleChangeVsCurrency}
        />
      </div>
      <div className="timeframe">
        <Select
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
