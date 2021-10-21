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
import { DetailsStyled } from "./styled/Details.styled";

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

  const priceColor =
    coinData &&
    coinData.price_change_percentage_24h &&
    coinData.price_change_percentage_24h < 0
      ? "error"
      : coinData &&
        coinData.price_change_percentage_24h &&
        coinData.price_change_percentage_24h > 0
      ? "success"
      : null;

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
    <>
      {coinData && chartData && (
        <DetailsStyled priceColor={priceColor}>
          <header>
            <div>
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
                    <FontAwesomeIcon icon={faStarSolid} />
                  ) : (
                    <FontAwesomeIcon icon={faStarOutline} />
                  )}
                </button>
              )}
              <img
                src={localStorage.getItem(coinData.id) || coinData.image}
                alt={`${coinData.name} logo`}
                height="64"
                width="64"
                loading="lazy"
              />
            </div>
            <h2>
              {coinData.name}
              <br />
              <small>{coinData.symbol}</small>
            </h2>
            <p>
              {coinData.current_price &&
                currencySymbol(vsCurrency) +
                  formatPriceNumber(coinData.current_price)}
            </p>
          </header>
        </DetailsStyled>
      )}
    </>
  );
};

export default Details;
