import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Actions
import { saveShippingAddress } from '../../../redux/slices/cartSlice';

// Import Components
import Button from '../Button';

function ShippingStep({ setCurrentStep }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ phoneNumber, address, city, postalCode, country })
    );
    setCurrentStep('Payment');
  };

return (
  <form
    onSubmit={submitHandler}
    className="w-full p-6 bg-white rounded-2xl shadow-md"
  >
    {/* Header */}
    <p className="text-center text-[#0B3D91] text-2xl font-bold">
      Shipping
      <br />
      <span className="text-sm text-gray-500 font-medium">
        Enter Shipping Details
      </span>
    </p>

    {cartItems && cartItems.length > 0 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

          {/* Phone */}
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 
                       text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-[#0B3D91] focus:border-[#0B3D91] transition"
          />

          {/* Address */}
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 
                       text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-[#0B3D91] focus:border-[#0B3D91] transition"
          />

          {/* City */}
          <input
            type="text"
            id="city"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 
                       text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-[#0B3D91] focus:border-[#0B3D91] transition"
          />

          {/* Postal Code */}
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            placeholder="Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 
                       text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-[#0B3D91] focus:border-[#0B3D91] transition"
          />

          {/* Country */}
          <input
            type="text"
            id="country"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 
                       text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-[#0B3D91] focus:border-[#0B3D91] transition"
          />
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={
            !address || !city || !postalCode || !country || !cartItems
          }
          className="w-full sm:w-1/3 mx-auto block mt-6 
                     bg-[#E31837] hover:bg-red-700 
                     text-white font-semibold py-3 
                     rounded-full transition 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center w-full border border-gray-300 rounded-2xl p-6 mt-6 bg-gray-50">
        <p className="text-[#E31837] text-lg font-semibold">
          Can't Place Order Without Order Items
        </p>
      </div>
    )}
  </form>
);

}

ShippingStep.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default ShippingStep;
