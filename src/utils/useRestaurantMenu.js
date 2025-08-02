import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setresInfo] = useState(null);
  const [resMenu, setresMenu] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId + "&catalog_qa=undefined");
    const json = await data.json();

    console.log(
      json?.data?.cards
        .find((obj) => obj?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (obj) =>
            obj?.card?.card["@type"]?.includes("ItemCategory") ||
            obj?.card?.card["@type"]?.includes("NestedItemCategory")
        )
    );

    const menuData = json.data.cards
      .find((obj) => obj?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (obj) =>
          obj?.card?.card["@type"]?.includes("ItemCategory") ||
          obj?.card?.card["@type"]?.includes("NestedItemCategory")
      );

    const organizedMenuData = menuData?.map((item) => {
      const type = item?.card.card["@type"];
      const title = item?.card?.card.title;
      const itemCards = item?.card?.card?.itemCards || [];
      const categories = item?.card?.card?.categories || [];

      if (type?.includes("NestedItemCategory")) {
        return {
          title,
          type: "nested",
          categories: categories?.map((subcategory) => {
            return {
              title: subcategory?.title,
              itemCards: subcategory?.itemCards,
            };
          }),
        };
      } else {
        return {
          title: title,
          type: "Non Nested",
          itemCards: itemCards,
        };
      }
    });

    setresInfo(
      json?.data?.cards.find((item) =>
        item?.card?.card["@type"]?.includes("food.v2.Restaurant")
      )?.card?.card?.info
    );

    setresMenu(organizedMenuData);
  };

  return { resInfo, resMenu };
};

export default useRestaurantMenu;
