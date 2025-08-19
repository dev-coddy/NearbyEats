import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice.js";
import { useSelector } from "react-redux";

import MenuItem from "./MenuItem.js";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showIndex, setShowIndex] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // custom hook to get menu data
  const { resInfo, resMenu } = useRestaurantMenu(resId);

  if (resInfo == null)
    return <div className="text-center text-lg mt-10">Loading..</div>;
  const { name, cuisines, locality, avgRating } = resInfo;

  return (
    <div className="max-w-[900px] mx-auto my-12 p-6">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold text-gray-800 mb-2"
          onClick={handleClick}
        >
          {name}
        </h1>
        <p className="text-[1.1rem] text-gray-600">
          Cuisines: {cuisines.join(", ")}
        </p>
        <p className="text-gray-600">Locality: {locality}</p>
        <p className="text-gray-600">Avg Rating: {avgRating}</p>
      </div>

      {resMenu.map((category, index) => {
        return category.type === "Non Nested" ? (
          <ItemCategory
            key={category?.title}
            data={category}
            showItems={index === showIndex ? true : false}
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }
          />
        ) : (
          <NestedItemCategory key={category?.title} data={category} />
        );
      })}
    </div>
  );
};

const ItemCategory = ({ data, showItems, setShowIndex }) => {
  const { title, itemCards } = data;
  const isOpen = showItems;

  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="mb-6">
      <div className=" bg-gray-100 py-5 px-3.5 rounded-lg shadow-lg  cursor-pointer mb-1">
        <h2
          className="text-xl font-bold text-gray-800 flex justify-between "
          onClick={handleClick}
        >
          {title} ({itemCards.length})
          {!isOpen ? (
            <i className="bi bi-chevron-down"></i>
          ) : (
            <i className="bi bi-chevron-up"></i>
          )}
        </h2>
        {isOpen && (
          <ul className="space-y-4">
            {itemCards.map((item) => {
              return (
                <MenuItem itemInfo={item.card.info} key={item.card.info.id} />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const NestedItemCategory = (props) => {
  const { title, categories } = props.data;
  const [showIndex, setShowIndex] = useState(null);

  return (
    <>
      <div className=" px-2 py-2  mb-4 ">
        <h3 className="text-lg font-bold text-gray-800">
          {title} ({categories.length})
        </h3>
      </div>

      {categories.map((category, index) => (
        <ItemSubCategory
          key={category.title}
          data={category}
          showItem={index === showIndex ? true : false}
          setShowIndex={() =>
            setShowIndex((prevIndex) => (prevIndex === index ? null : index))
          }
        />
      ))}
    </>
  );
};

const ItemSubCategory = ({ data, showItem, setShowIndex }) => {
  const { title, itemCards } = data;
  const isOpen = showItem;

  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div
      className="bg-gray-100 py-2 px-2 rounded-lg shadow-sm  cursor-pointer mb-3 "
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <h3 className="text-md font-bold text-gray-800 flex justify-between py-3">
          {title}
        </h3>
        {!isOpen ? (
          <i className="bi bi-chevron-down"></i>
        ) : (
          <i className="bi bi-chevron-up"></i>
        )}
      </div>

      {isOpen && (
        <ul className="space-y-4">
          {itemCards.map((subcategory) => (
            <MenuItem
              itemInfo={subcategory.card.info}
              key={subcategory.card.info.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

// const MenuItem = (props) => {
//   const RESTAURANT_MENU_IMG =
//     "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_240,h_240/";

//   const {
//     name,
//     price,
//     defaultPrice,
//     description,
//     imageId,
//     ratings: {
//       aggregatedRating: { rating, ratingCountV2 },
//     },
//   } = props?.itemInfo;
//   const itemInfo = props?.itemInfo;

//   const dispatch = useDispatch();

//   const handleClick = (itemInfo) => {
//     // dispatch an action
//     dispatch(addItem(itemInfo));
//   };

//   return (
//     <div>
//       <div className="flex justify-between gap-4 p-4 pb-12 border-gray-200 border-b-2">
//         <li className="flex-1 list-none">
//           <h4 className="mb-1 text-xl font-bold text-gray-700">{name}</h4>
//           {price && (
//             <span className="block text-sm text-gray-700">
//               Rs {(price / 100).toFixed(2)}
//             </span>
//           )}
//           {defaultPrice && (
//             <span className="block text-sm text-gray-700">
//               Rs {(defaultPrice / 100).toFixed(2)}
//             </span>
//           )}
//           {rating && ratingCountV2 && (
//             <div className="flex items-center gap-1">
//               <span>
//                 <i className="bi bi-star text-green-800 font-extrabold"></i>
//               </span>
//               <span className="text-green-800 font-bold">{rating}</span>
//               <span className="text-gray-600">({ratingCountV2})</span>
//             </div>
//           )}
//           {description && (
//             <p className="mt-1 text-sm text-gray-600 max-w-[500px]">
//               {description}
//             </p>
//           )}
//         </li>
//         <div className="relative">
//           <div className="w-[144px] h-[144px] overflow-hidden flex-shrink-0 shadow-sm">
//             {imageId && (
//               <img
//                 className="w-full h-full object-cover"
//                 src={RESTAURANT_MENU_IMG + imageId}
//                 alt=""
//               />
//             )}
//           </div>
//           <button
//             onClick={() => handleClick(itemInfo)}
//             className="bg-white absolute left-6 top-29 mt-2 px-9 py-2 rounded-lg text-green-600 font-semibold border border-gray-300 hover:shadow hover:bg-gray-300"
//           >
//             ADD
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default RestaurantMenu;
