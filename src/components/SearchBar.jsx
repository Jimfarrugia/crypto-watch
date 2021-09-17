import Select from "react-select";

const SearchBar = ({
  searchSuggestions,
  handleSearchInputChange,
  handleSearchChange,
}) => {
  // create styles object for react-select field

  // remember to preserve attributes from the old search-field

  return (
    <div className="search">
      <Select
        options={searchSuggestions}
        onInputChange={(e) => handleSearchInputChange(e)}
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export default SearchBar;
