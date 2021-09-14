const currencies = [
  "usd",
  "aud",
  "cad",
  "chf",
  "cny",
  "eur",
  "gbp",
  "jpy",
  "krw",
  "nok",
  "nzd",
];

const timeframes = [
  { label: "7 Days", value: 7 },
  { label: "14 Days", value: 14 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "12 Months", value: 365 },
];

const CurrencyButton = ({ value, handleChangeVsCurrency, vsCurrency }) => (
  <button
    onClick={() => handleChangeVsCurrency(value)}
    className={vsCurrency === value ? "active" : ""}
  >
    {value.toUpperCase()}
  </button>
);

const TimeframeButton = ({
  value,
  label,
  priceHistoryDays,
  handleChangePriceHistoryDays,
}) => (
  <button
    className={priceHistoryDays === value ? "active" : ""}
    onClick={() => handleChangePriceHistoryDays(value)}
  >
    {label}
  </button>
);

const Settings = ({
  vsCurrency,
  priceHistoryDays,
  handleChangePriceHistoryDays,
  handleChangeVsCurrency,
}) => {
  return (
    <div className="settings">
      <div className="currency">
        {currencies.map((currency) => (
          <CurrencyButton
            key={currency}
            value={currency}
            handleChangeVsCurrency={handleChangeVsCurrency}
            vsCurrency={vsCurrency}
          />
        ))}
      </div>
      <div className="timeframe">
        {timeframes.map((timeframe) => (
          <TimeframeButton
            value={timeframe.value}
            label={timeframe.label}
            priceHistoryDays={priceHistoryDays}
            handleChangePriceHistoryDays={handleChangePriceHistoryDays}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
