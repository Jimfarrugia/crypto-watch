// This function formats a number to a more readable format for currency.
// 50123456 -> $50,123,456
const formatPriceNumber = (number, currencySymbol) => {
  let result =
    number > 1000
      ? number
          .toString()
          .replace(/^/, currencySymbol)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : number.toString().replace(/^/, currencySymbol);
  // if there is a decimal point and it is in the 2nd last slot, append a "0"
  if (
    result.lastIndexOf(".") !== -1 &&
    result.lastIndexOf(".") === result.length - 2
  ) {
    return (result += "0");
  }
  return result;
};

const Details = ({ coinData, coinPriceHistory, defaultVsCurrency, error }) => {
  const { symbol } = defaultVsCurrency;

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="details">
      {coinData && coinData.name && (
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
                !coinData.price_change_percentage_24h.toString().match(/^-/) &&
                " text-green") ||
              ""
            }`}
          >
            {formatPriceNumber(coinData.current_price, symbol)}
          </p>
        </header>
      )}
      {coinData &&
        Object.keys(coinData).map((key) => (
          <p key={key}>{`${key}: ${coinData[key]}`}</p>
        ))}
      {coinPriceHistory &&
        coinPriceHistory.map((day, index) => (
          <p
            key={`coinPriceHistory${index}`}
          >{`${index}: Mkt Cap = ${day[0]}; Price = ${day[1]}`}</p>
        ))}
    </section>
  );
};

export default Details;
