import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-center gap-5 items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🛒 Your Cart
        </h1>
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition ml-10"
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">Your cart is empty.</p>
          <p className="text-sm mt-2">Add some items to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem itemInfo={item} key={item?.id} />
          ))}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              Total Items: {cartItems.length}
            </span>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
