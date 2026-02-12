import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaMoneyCheckAlt, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Components
import Button from '../../Button';
import Loader from '../../Loader';
import CartItemList from './CartItemList';
import Message from '../../Message';

function CartModal({ onClose }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { loading, cartItems, cartAddItemError, cartRemoveItemError } = cart;

  const handleModalClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCheckout = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
    navigate('/checkout');
  };

  useEffect(() => {
    if (onClose) {
      setModalVisible(true);
    }
  }, [onClose]);

  return (
  <div
    className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4 transition-opacity duration-200 ${
      modalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    onClick={handleModalClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-[#0B3D91] flex items-center gap-2">
          <FaShoppingCart />
          Your Cart
        </h2>

        <button
          className="text-[#E31837] border border-[#E31837] rounded-full p-2 hover:bg-[#E31837] hover:text-white transition"
          onClick={handleModalClose}
        >
          <FaTimes />
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {(cartAddItemError || cartRemoveItemError) && (
            <Message>
              {cartAddItemError || cartRemoveItemError}
            </Message>
          )}

          {cartItems && cartItems.length > 0 ? (
            <div className="space-y-4">
              <CartItemList />

              {/* Summary Section */}
              <div className="mt-6 border-t pt-4">
                <p className="text-xl font-bold text-[#0B3D91]">
                  Total: ₹
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )
                    .toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  *Shipping & taxes calculated at checkout
                </p>

                <hr className="my-4" />

                <p className="text-xs text-gray-400 leading-relaxed">
                  By proceeding to checkout, you agree to our Terms of
                  Service and Privacy Policy. Payments are processed
                  securely by our third-party provider.
                </p>

                <Button
                  variant="primary"
                  className="mt-5 w-full rounded-full bg-[#E31837] hover:bg-red-700 text-white py-3 text-lg transition disabled:opacity-50"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <FaMoneyCheckAlt className="inline-flex mr-2" />
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl font-semibold text-gray-600">
                Your Cart is Empty
              </p>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

}

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CartModal;
