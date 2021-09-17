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
      {searchSuggestions && searchSuggestions.length > 0 && (
        <div className="search-suggestions-wrapper">
          {/* If there are more than 10 suggestions 
              then only show those which begin with the search term */}
          {(searchSuggestions.length > 10 &&
            searchSuggestions.map((suggestion) => {
              let regex = new RegExp(`^${searchTerm}`, "i");
              return suggestion.match(regex) ? (
                <div
                  key={suggestion}
                  className="search-suggestion"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion}
                </div>
              ) : (
                ""
              );
            })) ||
            (searchSuggestions.length < 10 &&
              searchSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="search-suggestion"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion}
                </div>
              )))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
