import Select from "react-select";

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
      boxShadow: isFocused ? "0 0 0.25em #a239ca" : "none",
      borderColor: isFocused ? "#a239ca" : "#813772",
      "&:hover": {
        borderColor: "#a239ca",
        cursor: "text",
      },
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "1rem",
      backgroundColor: isFocused ? "#a239ca" : "#0e0b16",
      color: "#e7dfdd",
      borderBottom: "1px solid #813772",
      "&:hover": {
        backgroundColor: "#a239ca",
        color: "#e7dfdd",
        cursor: "pointer",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    }),
    input: (styles) => ({
      ...styles,
      color: "#a239ca",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#813772",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#813772",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#813772",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: "#813772",
    }),
    menu: (styles) => ({
      ...styles,
      margin: 0,
      backgroundColor: "#0e0b16",
      border: "1px solid #813772",
      borderTop: "none",
    }),
  };

  return (
    <div className="search">
      <Select
        options={options}
        styles={selectStyles}
        onInputChange={(e) => handleSearchInputChange(e)}
        onChange={(e) => handleSearchChange(e)}
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
