import SearchBar from "./Searchbar";
import RestaurantCard from "./ResturantCard";
import Shimmer from "./Shimmer";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";

const Body = () => {
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const { restaurantList, loading } = useRestaurantList();
  const [searchInput, setSearchInput] = useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    setfilteredRestaurants(restaurantList);
  }, [restaurantList]);

  const handleClick = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    const filteredRest = restaurantList.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setfilteredRestaurants(filteredRest);
  };

  return (
    <div className="body">
      <div className="buttons">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />
        <button
          className="search-button"
          onClick={() => {
            handleClick("/topRated");
          }}
        >
          Top Rated
        </button>
      </div>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="res-container">
          {filteredRestaurants.map((restaurant) => {
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

export default Body;
