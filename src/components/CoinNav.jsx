import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CoinNav = ({
  fetchCoinDataById,
  coinNavData,
  favorites,
  coinNavLength,
}) => {
  // do not include any items from [favorites] that are found in [coinNavData] (prevent doubling up)
  const favoritesToRender =
    !favorites || favorites.length < 1
      ? []
      : favorites.filter(
          favorite => !coinNavData.find(coin => coin.id === favorite.id)
        );
  const navItemsData = [...favoritesToRender, ...coinNavData];
  // if there are 10 or more favorites navItems, remove everything else and display them all
  const favoritesInNavItemsData = navItemsData.filter(item => item.isFavorite);
  const navItems =
    favoritesInNavItemsData.length >= coinNavLength
      ? favoritesInNavItemsData
      : navItemsData.slice(0, coinNavLength);

  return (
    <nav className="coin-nav">
      <ul>
        {navItems &&
          navItems.map(item => (
            <li key={item.symbol}>
              {item.isFavorite && (
                <FontAwesomeIcon className="star" icon={faStar} />
              )}
              <button
                type="button"
                title={item.name}
                onClick={e => {
                  fetchCoinDataById(item.id);
                  e.currentTarget.blur();
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.name} icon`}
                  height="32"
                  width="32"
                />
                <br />
                <span>{item.symbol}</span>
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default CoinNav;
