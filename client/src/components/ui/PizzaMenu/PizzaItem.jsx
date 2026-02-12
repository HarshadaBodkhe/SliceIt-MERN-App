import Proptypes from 'prop-types';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

// Import Components
import AddtoCartButton from '../Cart/AddToCartButton';

function PizzaItem({ pizza }) {
  const [qty, setQty] = useState(1);
  return (
  <div
    key={pizza._id}
    className="bg-white rounded-2xl shadow-md overflow-hidden 
               hover:scale-[1.03] hover:shadow-xl 
               transition-all duration-300"
    style={{ marginBottom: "50px" }}
  >
    <img
      src={pizza.imageUrl}
      alt={pizza.name}
      className="w-full h-52 object-cover border-b border-gray-200"
    />

    <div className="p-5 flex flex-col justify-between items-start">
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="text-lg font-semibold text-[#0B3D91]">
          {pizza.name}
        </h3>

        <span className="text-xl font-bold text-[#E31837]">
          ₹{pizza.price}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        {pizza.description}
      </p>

      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold text-[#0B3D91]">Size: </span>
        {pizza.size.charAt(0).toUpperCase() + pizza.size.slice(1)}
      </p>

      <div className="flex justify-between items-center w-full mt-2">
        <AddtoCartButton id={pizza._id} qty={qty} />

        <div className="flex items-center space-x-3 bg-gray-100 px-3 py-1 rounded-full">
          <button
            className="text-[#0B3D91] hover:text-[#E31837] transition"
            onClick={() => {
              if (qty > 1) setQty(qty - 1);
            }}
          >
            <FaMinus />
          </button>

          <p className="text-sm font-medium">Qty: {qty}</p>

          <button
            className="text-[#0B3D91] hover:text-[#E31837] transition"
            onClick={() => {
              if (qty < 10) setQty(qty + 1);
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  </div>
);

}

PizzaItem.propTypes = {
  pizza: Proptypes.object.isRequired,
};

export default PizzaItem;
