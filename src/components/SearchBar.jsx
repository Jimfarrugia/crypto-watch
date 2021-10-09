import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { selectStyles } from "../constants";

const SearchBar = ({
  searchTerm,
  searchSuggestions,
  handleSearchInputChange,
  handleSearchChange,
}) => {
  // If there are more than 10 suggestions, only show those which
  // begin with the search term.
  const options =
    searchSuggestions.length > 10
      ? searchSuggestions.filter(option => {
          let regex = new RegExp(`^${searchTerm}`, "i");
          return option.label.match(regex);
        })
      : searchSuggestions;

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faSearch} />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="search">
      <Select
        options={options}
        styles={selectStyles}
        components={{ DropdownIndicator }}
        onInputChange={input => handleSearchInputChange(input)}
        onChange={option => handleSearchChange(option)}
        noOptionsMessage={() => null}
        placeholder="Search..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export default SearchBar;
