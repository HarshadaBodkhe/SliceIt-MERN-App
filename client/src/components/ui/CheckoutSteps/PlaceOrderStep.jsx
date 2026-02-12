import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Thunks
import { createOrder } from '../../../redux/asyncThunks/orderThunks';
import { clearCartData } from '../../../redux/slices/cartSlice';

// Import Components
import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';
import RazorPayPaymentButton from './RazorPayPaymentButton';

function PlaceOrderStep({ setCurrentStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    orderGetRazorPayOrderDetails,
    orderRazorPayPaymentDetails,
  } = cart;

  const order = useSelector((state) => state.order);
  const { loading, orderInfo, orderCreateSuccess, orderCreateError } = order;

  const orderSummary = [
    {
      name: 'Items Price',
      value:
        cartItems &&
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    },
    {
      name: 'Delivery Charges',
      value:
        cartItems &&
          cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 100
          ? 0
          : 10,
    },
    {
      name: 'Sales Tax',
      value:
        cartItems &&
        Number(
          (
            0.15 *
            cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
          ).toFixed(2)
        ),
    },
    {
      name: 'Total',
      value:
        cartItems &&
        Math.round(
          (
            cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) +
            (cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) >
              100
              ? 0
              : 10) +
            Number(
              (
                0.15 *
                cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
              ).toFixed(2)
            )
          ).toFixed(2)
        ),
    },
  ];

  // const handlePlaceOrder = () => {
  //   dispatch(
  //     createOrder({
  //       orderItems: cartItems,
  //       deliveryAddress: shippingAddress,
  //       salesTax: orderSummary[2].value,
  //       deliveryCharges: orderSummary[1].value,
  //       totalPrice: orderSummary[3].value,
  //       // payment: {
  //       //   method: paymentMethod.toLowerCase().replace(' ', ''),
  //       //   razorpayOrderId: orderRazorPayPaymentDetails.razorPayPaymentId,
  //       //   status: orderRazorPayPaymentDetails ? 'success' : 'pending',
  //       // },
  //       payment: {
  //         method: 'razorpay',
  //         razorpayOrderId: orderGetRazorPayOrderDetails.id,
  //         status: 'success',
  //       },
  //     })
  //   );
  // };
  const handlePlaceOrder = () => {
  dispatch(
    createOrder({
      orderItems: cartItems.map(item => ({
        pizza: item._id,
        qty: item.qty,
        price: item.price,
        name: item.name,
      })),
      deliveryAddress: shippingAddress,
      salesTax: orderSummary[2].value,
      deliveryCharges: orderSummary[1].value,
      totalPrice: orderSummary[3].value,
      payment: {
        method: 'razorpay',
        razorpayOrderId: orderGetRazorPayOrderDetails.id,
        status: 'success',
      },
    })
  );
};


  useEffect(() => {
    if (orderCreateSuccess && orderInfo) {
      dispatch(clearCartData());
      navigate('/my-orders');
      setCurrentStep('Shipping');
    }
  }, [dispatch, navigate, orderCreateSuccess, orderInfo, setCurrentStep]);

  return (
  <div className="flex flex-col justify-between items-center mb-6">
    <h1 className="text-center text-[#0B3D91] text-2xl font-bold">
      Place Order
    </h1>

    {orderCreateError && <Message>{orderCreateError}</Message>}

    {loading ? (
      <Loader />
    ) : cartItems && cartItems.length > 0 ? (
      <div className="w-full flex flex-col md:flex-row mt-4 gap-6">

        {/* LEFT SECTION */}
        <div className="flex flex-col w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 space-y-6">

          {/* Shipping */}
          <div>
            <h2 className="text-xl font-bold text-[#0B3D91] mb-2">
              Shipping Address
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold text-black">Phone:</span>{" "}
              {shippingAddress.phoneNumber}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold text-black">Address:</span>{" "}
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-bold text-[#0B3D91] mb-2">
              Payment Method
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold text-black">Method:</span>{" "}
              {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-bold text-[#0B3D91] mb-4">
              Order Items
            </h2>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-3"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl"
                    />

                    <div>
                      <p className="font-semibold text-[#0B3D91]">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} | Size:{" "}
                        {item.size.charAt(0).toUpperCase() +
                          item.size.slice(1)}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-800 mt-2 sm:mt-0">
                    {item.qty} × ₹{item.price} = ₹
                    {item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION – SUMMARY */}
        <div className="flex flex-col w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold text-[#0B3D91] mb-4">
            Order Summary
          </h2>

          <div className="space-y-2">
            {orderSummary.map((item) => (
              <div
                key={item.name}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <p className="text-gray-700">{item.name}</p>
                <p className="font-semibold text-gray-800">
                  ₹{item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Razorpay Button */}
          {!orderRazorPayPaymentDetails.razorPayPaymentId && (
            <div className="mt-4">
              <RazorPayPaymentButton
                amount={orderSummary[3].value}
                orderId={orderGetRazorPayOrderDetails.id}
              />
            </div>
          )}

          {/* Place Order Button */}
          <button
            disabled={
              !orderRazorPayPaymentDetails.razorPayPaymentId ||
              orderRazorPayPaymentDetails.status === "pending"
            }
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-[#E31837] hover:bg-red-700 text-white font-semibold py-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <p className="text-[#E31837] text-lg font-semibold">
          Can't Place Order Without Order Items
        </p>
      </div>
    )}
  </div>
);

}

PlaceOrderStep.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default PlaceOrderStep;
