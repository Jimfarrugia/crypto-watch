import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CoinNav = ({ fetchCoinDataById, coinNavData, favorites }) => {
  const favoritesToRender = favorites.filter(
    favorite => !coinNavData.find(coin => coin.id === favorite.id)
  );
  const navItems = [...favoritesToRender, ...coinNavData];
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
                onClick={() => fetchCoinDataById(item.id)}
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
