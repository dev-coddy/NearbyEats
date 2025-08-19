import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const MenuItem = (props) => {
  const RESTAURANT_MENU_IMG =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_240,h_240/";

  const {
    name,
    price,
    defaultPrice,
    description,
    imageId,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
  } = props?.itemInfo;
  const itemInfo = props?.itemInfo;

  const dispatch = useDispatch();

  const handleClick = (itemInfo) => {
    // dispatch an action
    dispatch(addItem(itemInfo));
  };

  return (
    <div>
      <div className="flex justify-between gap-4 p-4 pb-12 border-gray-200 border-b-2">
        <li className="flex-1 list-none">
          <h4 className="mb-1 text-xl font-bold text-gray-700">{name}</h4>
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
          {rating && ratingCountV2 && (
            <div className="flex items-center gap-1">
              <span>
                <i className="bi bi-star text-green-800 font-extrabold"></i>
              </span>
              <span className="text-green-800 font-bold">{rating}</span>
              <span className="text-gray-600">({ratingCountV2})</span>
            </div>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600 max-w-[500px]">
              {description}
            </p>
          )}
        </li>
        <div className="relative">
          <div className="w-[144px] h-[144px] overflow-hidden flex-shrink-0 shadow-sm">
            {imageId && (
              <img
                className="w-full h-full object-cover"
                src={RESTAURANT_MENU_IMG + imageId}
                alt=""
              />
            )}
          </div>
          <button
            onClick={() => handleClick(itemInfo)}
            className="bg-white absolute left-6 top-29 mt-2 px-9 py-2 rounded-lg text-green-600 font-semibold border border-gray-300 hover:shadow hover:bg-gray-300"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
