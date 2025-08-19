import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines } = resData?.info;

  return (
    <div className="w-[280px] min-h-[280px] border border-gray-300 rounded-xl overflow-hidden shadow-md transition-transform duration-300 ease-in-out cursor-pointer">
      <img
        className="w-full h-[180px] object-cover rounded-t-xl mb-0"
        src={IMAGE_URL + cloudinaryImageId}
        alt=""
      />
      <div className="mt-0 p-2">
        <div className="flex justify-between mb-0">
          <h3 className="mb-0 text-lg font-medium">{name}</h3>
          <h3 className="text-green-600 mb-[2px]">{avgRating}</h3>
        </div>
        <h5 className="text-[rgb(95,93,93)] mt-0 mb-[2px] break-words text-sm">
          {cuisines.join(", ")}
        </h5>
      </div>
    </div>
  );
};

export const restaurantWithOffer = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    const { header, subHeader } = resData?.info.aggregatedDiscountInfoV3;

    return (
      <div className="relative">
        <RestaurantCard {...props} />
        <div className=" absolute bottom-24 w-full bg-gradient-to-t from-black to-transparent text-gray-100 text-xl font-black px-4 py-2 text-center">
          {header + " " + subHeader}
        </div>
      </div>
    );
  };
};

export default RestaurantCard;
