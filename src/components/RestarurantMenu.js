import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, resMenu } = useRestaurantMenu(resId);

  if (resInfo == null)
    return <div className="text-center text-lg mt-10">Loading..</div>;
  const { name, cuisines, locality, avgRating } = resInfo;

  return (
    <div className="max-w-[800px] mx-auto my-12 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
        <p className="text-[1.1rem] text-gray-600">
          Cuisines: {cuisines.join(", ")}
        </p>
        <p className="text-gray-600">Locality: {locality}</p>
        <p className="text-gray-600">Avg Rating: {avgRating}</p>
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
    <div className="mb-6">
      <div className="border border-yellow-400 p-5 rounded-lg bg-yellow-200 mb-3 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          {title} ({itemCards.length})
        </h2>
      </div>
      <ul className="space-y-4">
        {itemCards.map((item) => {
          return <MenuItem itemInfo={item.card.info} key={item.card.info.id} />;
        })}
      </ul>
    </div>
  );
};

const NestedItemCategory = (props) => {
  const { title, categories } = props.data;

  return (
    <>
      <div className="border border-yellow-400 px-4 py-2 rounded-lg bg-yellow-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          {title} ({categories.length})
        </h3>
      </div>

      {categories.map((categories) => (
        <div key={categories.title} className="mb-6">
          <h3 className="bg-green-300 border border-green-400 w-fit px-4 py-1.5 rounded-md text-gray-800 font-medium mb-3">
            {categories.title}
          </h3>
          <ul className="space-y-4">
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
      <div className="flex justify-between gap-4">
        <li className="flex-1 list-none">
          <h4 className="mb-1 text-lg font-semibold text-gray-900">{name}</h4>
          {price && (
            <span className="block text-sm text-gray-700">
              Rs {(price / 100).toFixed(2)}
            </span>
          )}
          {defaultPrice && (
            <span className="block text-sm text-gray-700">
              Rs {(defaultPrice / 100).toFixed(2)}
            </span>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600 max-w-[500px]">
              {description}
            </p>
          )}
        </li>
        <div className="w-[144px] h-[144px] rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
          {imageId && (
            <img
              className="w-full h-full object-cover"
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
