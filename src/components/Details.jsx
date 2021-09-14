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

// This function formats a number to a more readable format for currency.
// 50123456 -> $50,123,456
// 101.9 -> $101.90
const formatPriceNumber = (number, vsCurrency) => {
  let symbol = "";
  if (vsCurrency.charAt(vsCurrency.length - 1) === "d") {
    symbol = "$";
  } else if (vsCurrency.charAt(vsCurrency.length - 1) === "y") {
    symbol = "¥";
  } else {
    switch (vsCurrency) {
      case "gbp":
        symbol = "£";
        break;
      case "eur":
        symbol = "€";
        break;
      case "krw":
        symbol = "₩";
        break;
      case "nok":
        symbol = "Kr";
        break;
      case "chf":
        symbol = "Fr.";
        break;
      default:
        symbol = "";
    }
  }
  let result =
    number > 1000
      ? number // commas
          .toString()
          .replace(/^/, symbol)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : number.toString().replace(/^/, symbol); // no commas
  if (
    // if there is a decimal point and it is in the 2nd last slot, append a "0"
    result.lastIndexOf(".") !== -1 &&
    result.lastIndexOf(".") === result.length - 2
  ) {
    return (result += "0");
  }
  return result;
};

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

const Details = ({
  coinData,
  chartData,
  vsCurrency,
  priceHistoryDays,
  handleChangePriceHistoryDays,
  handleChangeVsCurrency,
  error,
}) => {
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <section className="details">
      {coinData && chartData && (
        <>
          <header>
            <img
              src={coinData.image}
              alt={`${coinData.name} logo`}
              height="64"
              width="64"
            />
            <h2>
              {coinData.name}
              <br />
              <small>{coinData.symbol}</small>
            </h2>
            <p
              className={`current-price${
                (coinData.price_change_percentage_24h &&
                  coinData.price_change_percentage_24h.toString().match(/^-/) &&
                  " text-red") ||
                (coinData.price_change_percentage_24h &&
                  !coinData.price_change_percentage_24h
                    .toString()
                    .match(/^-/) &&
                  " text-green") ||
                ""
              }`}
            >
              {coinData.current_price &&
                formatPriceNumber(coinData.current_price, vsCurrency)}
            </p>
          </header>
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
        </>
      )}
    </section>
  );
};

export default Details;
