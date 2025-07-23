const SearchBar = (props) => {
  const { searchInput, setSearchInput, onSearch } = props;

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search for restaurants, cuisines..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
