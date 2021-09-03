const SearchSuggestion = ({ handleSuggestionSelect, suggestion, index }) => {
  return (
    <div
      key={index}
      className="search-suggestion"
      onClick={() => handleSuggestionSelect(suggestion)}
    >
      {suggestion}
    </div>
  );
};

const SearchBar = ({
  handleSearchSubmit,
  searchTerm,
  handleSearchTermChange,
  setSearchSuggestions,
  searchSuggestions,
  handleSuggestionSelect,
}) => {
  return (
    <div className="search-section">
      <form
        onSubmit={handleSearchSubmit}
        className="search-form"
        autoComplete="off"
      >
        <div className="search-field-wrapper">
          <input
            type="text"
            className="search-field"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search..."
            onBlur={() => setTimeout(() => setSearchSuggestions([]), 100)}
          />
          <input type="submit" className="search-button" value="Search" />
        </div>
      </form>
      <div className="search-suggestions-wrapper">
        {/* If there are more than 10 suggestions 
              then only show those which begin with the search term */}
        {(searchSuggestions &&
          searchSuggestions.length > 10 &&
          searchSuggestions.map((suggestion, index) => {
            let regex = new RegExp(`^${searchTerm}`, "i");
            return suggestion.match(regex) ? (
              <SearchSuggestion
                index={index}
                suggestion={suggestion}
                handleSuggestionSelect={handleSuggestionSelect}
              />
            ) : (
              <></>
            );
          })) ||
          (searchSuggestions &&
            searchSuggestions.length > 0 &&
            searchSuggestions.map((suggestion, index) => (
              <SearchSuggestion
                index={index}
                suggestion={suggestion}
                handleSuggestionSelect={handleSuggestionSelect}
              />
            )))}
      </div>
    </div>
  );
};

export default SearchBar;
