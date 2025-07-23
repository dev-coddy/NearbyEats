const FilterButton = () => {
  return (
    <button
      className="search-button"
      onClick={() => {
        // filter logic here
        const restaurantList = restaurantList.filter(
          (rest) => rest.info.avgRating > 4.5
        );
      }}
    >
      Top Rated
    </button>
  );
};

export default FilterButton;
