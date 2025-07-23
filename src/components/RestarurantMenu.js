import { useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setresInfo] = useState();
  const [resMenu, setresMenu] = useState();
  const { resId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(MENU_API + resId + "&catalog_qa=undefined");
      const json = await data.json();

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

    fetchData();
  }, []);

  if (resInfo == null) return <div className="">Loading..</div>;
  const { name, cuisines, locality, avgRating } = resInfo;

  return (
    <div className="menu-wrapper">
      <div className="menu-header">
        <h1 className="menu-title">{name}</h1>
        <p className="menu-cuisine">Cuisines: {cuisines.join(", ")}</p>
        <p>Locality : {locality}</p>
        <p>AvgRating: {avgRating}</p>
      </div>
      {/* <div className="menu-list">
        {itemCards?.map((item) => {
          return (
            <MenuCard key={item.card.info.id} itemCard={item?.card.info} />
          );
        })}
      </div> */}

      {resMenu.map((category) => {
        return category.type === "Non Nested" ? (
          <ItemCategory key={category?.title} data={category} />
        ) : (
          <NestedItemCategory key={category?.title} data={category} />
        );
      })}
    </div>
  );
};

const ItemCategory = (props) => {
  const { title, itemCards } = props?.data;

  return (
    <div className="">
      <div className="item-category">
        <h2>
          {title}({itemCards.length})
        </h2>
      </div>
      <ul>
        {itemCards.map((item) => {
          return <MenuItem itemInfo={item.card.info} key={item.card.info.id} />;
        })}
      </ul>
    </div>
  );
};

const NestedItemCategory = (props) => {
  console.log(props);
  const { title, categories } = props.data;
  return (
    <>
      <div className="item-category">
        <h3>
          {title}({categories.length})
        </h3>
      </div>

      {categories.map((categories) => (
        <div key={categories.title}>
          <h3 className="categories-title">{categories.title}</h3>
          <ul>
            {categories.itemCards.map((subcategory) => (
              <MenuItem
                itemInfo={subcategory.card.info}
                key={subcategory.card.info.id}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

const MenuItem = (props) => {
  const RESTAURANT_MENU_IMG =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_240,h_240/";

  const { name, price, defaultPrice, description, imageId } = props?.itemInfo;
  return (
    <div>
      <div className="item-container">
        <li>
          <h4 className="item-title">{name}</h4>
          {price && (
            <span className="item-price">Rs {(price / 100).toFixed(2)}</span>
          )}
          {defaultPrice && <span>Rs {(defaultPrice / 100).toFixed(2)}</span>}
          {description && <p className="item-desc">{description}</p>}
        </li>
        <div className="image-container">
          {imageId && (
            <img
              className="item-img"
              src={RESTAURANT_MENU_IMG + imageId}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
