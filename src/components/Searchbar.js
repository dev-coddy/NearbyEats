const SearchBar = (props) => {
  const { searchInput, setSearchInput, onSearch } = props;

  return (
    <div className="flex justify-center items-center my-10 mx-auto gap-2 w-full max-w-[600px]">
      <input
        className="w-full px-4 py-3 text-base text-black placeholder-gray-400 border-2 border-[#ddd] rounded-full outline-none transition-colors duration-300 ease-in-out focus:border-[#ff6b6b]"
        type="text"
        placeholder="Search for restaurants, cuisines...,"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <button
        className="whitespace-nowrap px-5 py-3 bg-[#ff6b6b] text-white rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#e25555]"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
