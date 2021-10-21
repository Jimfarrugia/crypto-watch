import Select from "./Select";
import { currencies, timeframes } from "../constants";
import { SettingsStyled } from "./styled/Settings.styled";

const Settings = ({
  vsCurrency,
  timeframe,
  handleChangeTimeframe,
  handleChangeVsCurrency,
}) => {
  return (
    <SettingsStyled>
      <div>
        <Select
          isSearchable={false}
          options={currencies}
          placeholder={vsCurrency.toUpperCase()}
          onChange={handleChangeVsCurrency}
        />
      </div>
      <div>
        <Select
          isSearchable={false}
          options={timeframes}
          placeholder={timeframe.label}
          onChange={handleChangeTimeframe}
        />
      </div>
    </SettingsStyled>
  );
};

export default Settings;
