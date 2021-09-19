import { formatPriceNumber } from "../helpers";

const Details = ({ coinData, chartData, vsCurrency, error }) => {
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
        </>
      )}
    </section>
  );
};

export default Details;
