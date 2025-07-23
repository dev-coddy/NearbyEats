import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, resMenu } = useRestaurantMenu(resId);

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
