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

const CurrencyButton = ({
  value,
  label,
  vsCurrency,
  handleChangeVsCurrency,
}) => (
  <button
    onClick={() => handleChangeVsCurrency(value)}
    className={vsCurrency === value ? "active" : ""}
  >
    {label}
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
            key={currency.value}
            value={currency.value}
            label={currency.label}
            handleChangeVsCurrency={handleChangeVsCurrency}
            vsCurrency={vsCurrency}
          />
        ))}
      </div>
      <div className="timeframe">
        {timeframes.map((timeframe) => (
          <TimeframeButton
            key={`${timeframe.value}days`}
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
