import SearchBar from "./Searchbar";
// import FilterButton from "./FilterButton";
import RestaurantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

const Body = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(" ");
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    const filteredRest = restaurantList.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setfilteredRestaurants(filteredRest);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(API_URL);

      const json = await data.json();

      const restList =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setrestaurantList(restList);
      setfilteredRestaurants(restList);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch", error);
    }
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
