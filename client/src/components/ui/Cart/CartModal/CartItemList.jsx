import { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import { addToCart, removeFromCart } from '../../../../redux/slices/cartSlice';

// Import Components
import Button from '../../Button';

function CartItemList() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // State to manage item quantities
  const [itemQuantities, setItemQuantities] = useState({});

  // Function to update item quantity
  const updateQuantity = (itemId, quantity) => {
    setItemQuantities({
      ...itemQuantities,
      [itemId]: quantity,
    });
  };

return (
  <>
    {cartItems.map((item) => (
      <div
        key={item._id}
        className="flex items-center gap-4 border-b border-gray-200 py-4"
      >
        {/* Product Image */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-contain"
        />

        {/* Product Details */}
        <div className="flex-grow">
          <p className="font-semibold text-[#0B3D91] text-lg">
            {item.name}
          </p>

          <p className="text-sm text-gray-600">
            ₹{item.price} • Size{" "}
            {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={() => {
                const newQuantity =
                  (itemQuantities[item._id] || item.qty) - 1;
                if (newQuantity >= 1) {
                  dispatch(addToCart({ id: item._id, qty: newQuantity }));
                  updateQuantity(item._id, newQuantity);
                }
              }}
            >
              <FaMinus className="text-[#E31837]" />
            </button>

            <p className="font-medium">{item.qty}</p>

            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={() => {
                const newQuantity =
                  (itemQuantities[item._id] || item.qty) + 1;
                if (newQuantity <= 10) {
                  dispatch(addToCart({ id: item._id, qty: newQuantity }));
                  updateQuantity(item._id, newQuantity);
                }
              }}
            >
              <FaPlus className="text-[#0B3D91]" />
            </button>
          </div>
        </div>

        {/* Total + Remove */}
        <div className="flex flex-col items-end gap-2">
          <p className="font-bold text-[#0B3D91]">
            ₹{(item.price * item.qty).toLocaleString("en-IN")}
          </p>

          <button
            className="text-[#E31837] hover:scale-110 transition"
            onClick={() => dispatch(removeFromCart(item._id))}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    ))}
  </>
);

}

export default CartItemList;
