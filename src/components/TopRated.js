import SearchBar from "./Searchbar";
import RestaurantCard from "./ResturantCard";
import Shimmer from "./Shimmer";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

const TopRated = () => {
  const [filteredRestaurantList, setfilteredRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(" ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);

    const json = await data.json();

    let restList =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    restList = restList.filter((rest) => rest.info.avgRating > 4.4);

    setfilteredRestaurantList(restList);
    setLoading(false);
  };

  const handleSearch = () => {
    const filteredRest = filteredRestaurantList.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setfilteredRestaurantList(filteredRest);
  };

  return (
    <div className="body">
      <div className="flex justify-between items-center max-w-[800px] mx-auto my-5 gap-0 px-[10px]">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />
      </div>

      {loading ? (
        <Shimmer />
      ) : (
        <div className="w-[1200px] mx-auto flex flex-wrap gap-[10px]">
          {filteredRestaurantList.map((restaurant) => {
            return (
              <Link
                className="res-link"
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                <RestaurantCard resData={restaurant} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopRated;
