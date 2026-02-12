import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

import Button from '../Button';

function CartButton({ children, ...props }) {
return (
  <button
    {...props}
    className="bg-[#0B3D91] hover:bg-blue-800 text-white font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-full inline-flex items-center text-sm sm:text-base shadow-md hover:shadow-lg transition duration-200"
  >
    <FaShoppingCart className="text-lg sm:text-2xl sm:mr-2" />

    <span className="hidden sm:inline-flex">Your Cart</span>

    {/* Badge */}
    <span className="ml-2 bg-[#E31837] text-white font-bold rounded-full h-5 w-5 sm:h-7 sm:w-7 flex items-center justify-center text-xs sm:text-sm shadow">
      {children}
    </span>
  </button>
);

}

CartButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartButton;
