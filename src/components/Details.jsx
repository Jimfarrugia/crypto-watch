import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import {
  currencySymbol,
  formatPriceNumber,
  saveImageToLocalStorage,
} from "../helpers";
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

  const isFavorite =
    coinData &&
    favorites &&
    favorites.find(favorite => favorite.id === coinData.id);

  const handleFavorite = (isFavorite, coinData) => {
    const data = {
      id: coinData.id,
      name: coinData.name,
      symbol: coinData.symbol,
      image: coinData.image,
      isFavorite: true,
    };
    return isFavorite ? handleRemoveFavorite(data) : handleNewFavorite(data);
  };

  useEffect(() => {
    if (coinData && !localStorage.getItem(coinData.id)) {
      saveImageToLocalStorage(coinData.id, coinData.image);
    }
  }, [coinData]);

  return (
    <section className="details">
      {coinData && chartData && (
        <>
          <header>
            <div className="logo-wrapper">
              {currentUser && (
                <button
                  type="button"
                  title={isFavorite ? "Remove Favorite" : "Add Favorite"}
                  onClick={e => {
                    handleFavorite(isFavorite, coinData);
                    e.currentTarget.blur();
                  }}
                >
                  {isFavorite ? (
                    <FontAwesomeIcon icon={faStarSolid} className="star" />
                  ) : (
                    <FontAwesomeIcon icon={faStarOutline} className="star" />
                  )}
                </button>
              )}
              <img
                src={localStorage.getItem(coinData.id) || coinData.image}
                alt={`${coinData.name} logo`}
                height="64"
                width="64"
              />
            </div>
            <h2>
              {coinData.name}
              <br />
              <small>{coinData.symbol}</small>
            </h2>
            <p
              className={`current-price${
                (coinData.price_change_percentage_24h &&
                  coinData.price_change_percentage_24h < 0 &&
                  " text-red") ||
                (coinData.price_change_percentage_24h &&
                  coinData.price_change_percentage_24h > 0 &&
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
