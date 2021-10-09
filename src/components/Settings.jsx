import Select from "react-select";
import { currencies, timeframes, selectStyles } from "../constants";

const Settings = ({
  vsCurrency,
  priceHistoryDays,
  handleChangePriceHistoryDays,
  handleChangeVsCurrency,
}) => {
  return (
    <div className="settings">
      <div className="currency">
        <Select
          isSearchable={false}
          options={currencies}
          styles={selectStyles}
          placeholder={vsCurrency.toUpperCase()}
          onChange={handleChangeVsCurrency}
        />
      </div>
      <div className="timeframe">
        <Select
          isSearchable={false}
          options={timeframes}
          styles={selectStyles}
          placeholder={priceHistoryDays.label}
          onChange={handleChangePriceHistoryDays}
        />
      </div>
    </div>
  );
};

export default Settings;
