import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { color } from "../constants";

const { black, white, purple, purpleBright } = color;

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
      ? searchSuggestions.filter((option) => {
          let regex = new RegExp(`^${searchTerm}`, "i");
          return option.label.match(regex);
        })
      : searchSuggestions;

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "1rem",
      background: "none",
      boxShadow: isFocused ? `0 0 0.25em ${purpleBright}` : "none",
      borderColor: isFocused ? purpleBright : purple,
      "&:hover": {
        borderColor: purpleBright,
        cursor: "text",
      },
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "1rem",
      backgroundColor: isFocused ? purpleBright : black,
      color: white,
      borderBottom: `1px solid ${purpleBright}`,
      "&:hover": {
        backgroundColor: purpleBright,
        color: white,
        cursor: "pointer",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    }),
    input: (styles) => ({
      ...styles,
      color: purpleBright,
    }),
    placeholder: (styles) => ({
      ...styles,
      color: purple,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: purple,
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: purple,
      "&:hover": {
        color: purple,
      },
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: purple,
    }),
    menu: (styles) => ({
      ...styles,
      margin: 0,
      backgroundColor: black,
      border: `1px solid ${purpleBright}`,
      borderTop: "none",
    }),
  };

  const DropdownIndicator = (props) => {
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
        onInputChange={(input) => handleSearchInputChange(input)}
        onChange={(option) => handleSearchChange(option)}
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
