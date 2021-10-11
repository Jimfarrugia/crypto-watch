import Select from "react-select";
import { currencies, timeframes, selectStyles } from "../constants";

const Settings = ({
  vsCurrency,
  timeframe,
  handleChangeTimeframe,
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
          placeholder={timeframe.label}
          onChange={handleChangeTimeframe}
        />
      </div>
    </div>
  );
};

export default Settings;
