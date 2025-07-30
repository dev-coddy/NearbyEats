import SearchBar from "./Searchbar";
import RestaurantCard from "./ResturantCard";
import Shimmer from "./Shimmer";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";
import useOnlineStatus from "../utils/useOnlineStatus";

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

  const isOnline = useOnlineStatus();

  if (isOnline === false) return <h2>Sorry you are Offline!!</h2>;

  return (
    <div className="body">
      <div className="flex justify-between items-center max-w-[800px] mx-auto my-5 gap-0 px-2">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />
        <button
          className="whitespace-nowrap px-5 py-3 bg-[#ff6b6b] text-white rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#ff4f4f]"
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
        <div className="w-[1200px] mx-auto flex flex-wrap gap-2">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                className="no-underline text-inherit"
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
