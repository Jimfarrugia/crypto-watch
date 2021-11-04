import { useState, useEffect } from "react";
import { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { default as axios } from "axios";
import { SearchBarStyled } from "./styled/SearchBar.styled";
import Select from "./Select";
import { API_BASE_URL } from "../constants";

const SearchBar = ({ handleSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [coinList, setCoinList] = useState([]);

  // If there are more than 10 suggestions, only show those which
  // begin with the search term.
  const options =
    searchSuggestions.length > 10
      ? searchSuggestions.filter(option => {
          let regex = new RegExp(`^${searchTerm}`, "i");
          return option.label.match(regex);
        })
      : searchSuggestions;

  const fetchCoinList = () => {
    axios
      .get(`${API_BASE_URL}/coins/list`)
      .then(response => setCoinList(response.data))
      .catch(error => console.error(error));
  };

  const handleSearchInputChange = input => {
    if (input.match(/[^A-Za-z0-9.!-\s]/, "g")) {
      // disallow most symbols
      return searchTerm;
    }
    setSearchTerm(input);
    if (input.length < 1) {
      return setSearchSuggestions([]);
    }
    const matches = coinList.filter(coin => {
      let regex = new RegExp(`${input.trim()}`, "gi");
      return coin.name.match(regex); // || coin.symbol.match(regex); //? symbol search isn't working
    });
    setSearchSuggestions(
      matches.map(coin => ({
        label: coin.name,
        value: coin.id,
      }))
    );
  };

  useEffect(() => fetchCoinList(), []);

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faSearch} />
      </components.DropdownIndicator>
    );
  };

  return (
    <SearchBarStyled>
      <Select
        options={options}
        components={{ DropdownIndicator }}
        onInputChange={input => handleSearchInputChange(input)}
        onChange={option => {
          setSearchSuggestions([]);
          handleSearchSubmit(option.value);
        }}
        noOptionsMessage={() => null}
        placeholder="Search..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </SearchBarStyled>
  );
};

export default SearchBar;
