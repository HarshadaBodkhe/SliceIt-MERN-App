import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Actions
import {
  createRazorPayOrder,
  savePaymentMethod,
} from '../../../redux/slices/cartSlice';

// Import Components
import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

function PaymentStep({ setCurrentStep }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress,
    cartItems,
    orderGetRazorPayOrderDetails,
    orderGetRazorPayOrderIdError,
    orderGetRazorPayOrderIdSuccess,
  } = cart;

  const order = useSelector((state) => state.order);
  const { loading } = order;

  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod || '');

  useEffect(() => {
    if (!shippingAddress) {
      setCurrentStep('Shipping');
    }
  }, [shippingAddress, setCurrentStep]);

  const submitHandler = (e) => {
    e.preventDefault();

    const amount =
      cartItems &&
      Math.round(
        (
          cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) +
          (cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 100
            ? 0
            : 10) +
          Number(
            (
              0.15 *
              cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            ).toFixed(2)
          )
        ).toFixed(2)
      );

    dispatch(savePaymentMethod(paymentMethod));
    // dispatch(createRazorPayOrder({ amount, currency: 'USD' }));
    dispatch(
      createRazorPayOrder({
        amount: Number(amount), // keep it clean
        currency: 'INR',
      })
    );
  };

  useEffect(() => {
    if (orderGetRazorPayOrderIdSuccess && orderGetRazorPayOrderDetails) {
      setCurrentStep('Place Order');
    }
  }, [
    orderGetRazorPayOrderIdSuccess,
    orderGetRazorPayOrderDetails,
    setCurrentStep,
  ]);
return (
  <form onSubmit={submitHandler} className="w-full p-6 bg-white rounded-2xl shadow-md">
    
    {/* Header */}
    <p className="text-center text-[#0B3D91] text-2xl font-bold leading-relaxed">
      Payment
      <br />
      <span className="text-sm text-gray-500 font-medium">
        Select Payment Method
      </span>
    </p>

    {loading ? (
      <Loader />
    ) : cartItems && cartItems.length > 0 ? (
      <>
        {orderGetRazorPayOrderIdError && (
          <Message>{orderGetRazorPayOrderIdError}</Message>
        )}

        {/* Payment Option */}
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full border border-gray-300">
            
            <input
              type="radio"
              id="razorpay"
              value="Razorpay"
              name="paymentMethod"
              required
              checked={paymentMethod === "Razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-[#E31837] w-4 h-4"
            />

            <label
              htmlFor="razorpay"
              className="text-[#0B3D91] font-semibold text-lg cursor-pointer"
            >
              Razorpay
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={!paymentMethod || !cartItems}
          className="w-full sm:w-1/3 mx-auto block mt-6 
                     bg-[#E31837] hover:bg-red-700 
                     text-white font-semibold 
                     py-3 rounded-full transition 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center w-full border border-gray-300 rounded-2xl p-6 mt-6 bg-gray-50">
        <p className="text-center text-[#E31837] text-lg font-semibold">
          Can't Place Order Without Order Items
        </p>
      </div>
    )}
  </form>
);

}

PaymentStep.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default PaymentStep;
