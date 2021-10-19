import Select from "react-select";
import { currencies, timeframes, selectStyles } from "../constants";
import { SettingsStyled } from "./styled/Settings.styled";

const Settings = ({
  vsCurrency,
  timeframe,
  handleChangeTimeframe,
  handleChangeVsCurrency,
}) => {
  return (
    <SettingsStyled>
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
    </SettingsStyled>
  );
};

export default Settings;
