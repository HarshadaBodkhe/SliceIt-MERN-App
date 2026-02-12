import { useEffect, useState } from 'react';
import { FaCheck, FaMoneyCheckAlt, FaTruck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Components
import CurrentCheckoutStep from '../../components/ui/CheckoutSteps/CurrentCheckoutStep';
import PaymentStep from '../../components/ui/CheckoutSteps/PaymentStep';
import PlaceOrderStep from '../../components/ui/CheckoutSteps/PlaceOrderStep';
import ShippingStep from '../../components/ui/CheckoutSteps/ShippingStep';

function CheckoutScreen() {
  const [currentStep, setCurrentStep] = useState('Shipping');

  const AllSteps = [
    {
      step: 'Shipping',
      icon: <FaTruck className="inline-block sm:mr-1" />,
    },
    {
      step: 'Payment',
      icon: <FaMoneyCheckAlt className="inline-block sm:mr-1" />,
    },
    {
      step: 'Place Order',
      icon: <FaCheck className="inline-block sm:mr-1" />,
    },
  ];

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const admin = useSelector((state) => state.admin);
  const { adminUserInfo } = admin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (!userInfo && !adminUserInfo) {
      navigate('/login');
    }
    // else if (!cartItems) {
    //   navigate('/menu');
    // }
  }, [navigate, userInfo, adminUserInfo, cartItems]);

return (
  <section className="min-h-screen flex flex-col justify-center items-center pt-24 pb-10 px-4 sm:px-12 bg-gray-50">
    
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-200">
      
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0B3D91] mb-6">
        Checkout
      </h2>

      <div className="mb-8">
        <CurrentCheckoutStep 
          currentStep={currentStep} 
          AllSteps={AllSteps} 
        />
      </div>

      {currentStep === 'Shipping' && (
        <ShippingStep setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 'Payment' && (
        <PaymentStep setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 'Place Order' && (
        <PlaceOrderStep setCurrentStep={setCurrentStep} />
      )}

    </div>
  </section>
);

}

export default CheckoutScreen;
