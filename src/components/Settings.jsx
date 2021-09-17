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
      cursor: "pointer",
    },
  }),
  option: (styles) => ({
    ...styles,
    fontSize: "0.9rem",
    backgroundColor: "#0e0b16",
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
