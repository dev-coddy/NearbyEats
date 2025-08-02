import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

const useRestaurantList = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  };

  return { restaurantList, loading };
};

export default useRestaurantList;
