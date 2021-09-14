import { Line } from "react-chartjs-2";

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
        symbol = "Fr";
        break;
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
              <button
                className={priceHistoryDays === 7 ? "active" : ""}
                onClick={() => handleChangePriceHistoryDays(7)}
              >
                7 Days
              </button>
              <button
                className={priceHistoryDays === 14 ? "active" : ""}
                onClick={() => handleChangePriceHistoryDays(14)}
              >
                14 Days
              </button>
              <button
                className={priceHistoryDays === 30 ? "active" : ""}
                onClick={() => handleChangePriceHistoryDays(30)}
              >
                30 Days
              </button>
              <button
                className={priceHistoryDays === 90 ? "active" : ""}
                onClick={() => handleChangePriceHistoryDays(90)}
              >
                3 Months
              </button>
              <button
                className={priceHistoryDays === 180 ? "active" : ""}
                onClick={() => handleChangePriceHistoryDays(180)}
              >
                6 Months
              </button>
            </div>
          </div>
          <Line data={chartData} />
        </>
      )}
    </section>
  );
};

export default Details;
