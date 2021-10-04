import { currencySymbol, formatPriceNumber } from "../helpers";
import { useAuth } from "../contexts/AuthContext";

const Details = ({
  coinData,
  chartData,
  vsCurrency,
  favorites,
  handleNewFavorite,
  handleRemoveFavorite,
}) => {
  const { currentUser } = useAuth();
  const isFavorite = coinData && favorites.includes(coinData.id);

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
            {currentUser && !isFavorite && (
              <p>
                <button
                  type="button"
                  title="Add Favorite"
                  onClick={() => handleNewFavorite(coinData.id)}
                >
                  Add Favorite
                </button>
              </p>
            )}
            {currentUser && isFavorite && (
              <p>
                <button
                  type="button"
                  title="Remove Favorite"
                  onClick={() => handleRemoveFavorite(coinData.id)}
                >
                  Remove Favorite
                </button>
              </p>
            )}
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
                currencySymbol(vsCurrency) +
                  formatPriceNumber(coinData.current_price)}
            </p>
          </header>
        </>
      )}
    </section>
  );
};

export default Details;
