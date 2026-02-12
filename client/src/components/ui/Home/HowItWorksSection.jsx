import { FaPizzaSlice, FaCartPlus, FaMoneyCheckAlt } from 'react-icons/fa';
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs';

function HowItWorksSection() {
  const StepsToOrderPizza = [
    {
      step: 1,
      icon: <FaPizzaSlice />,
      title: 'Choose Your Pizza',
      description:
        'Browse our delicious range of pizzas and select your favorite one.',
    },
    {
      step: 2,
      icon: <FaCartPlus />,
      title: 'Add to Cart',
      description:
        'Click the "Add to Cart" button to add your chosen pizza to your cart.',
    },
    {
      step: 3,
      icon: <FaMoneyCheckAlt />,
      title: 'Checkout Your Order',
      description:
        'Review your order details and proceed to the secure checkout.',
    },
    {
      step: 4,
      icon: <BsFillEmojiHeartEyesFill />,
      title: 'Enjoy Your Pizza',
      description:
        'Sit back, relax, and enjoy your delicious pizza delivered to your doorstep.',
    },
  ];

  return (
  <section
    id="how-it-works"
    className="min-h-screen flex flex-col justify-center items-center 
               py-16 px-6 sm:px-12 bg-gray-50"
  >
    <h1 className="text-3xl sm:text-4xl md:text-5xl 
                   text-[#0B3D91] font-bold mb-4 text-center">
      How It Works
    </h1>

    <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl">
      We have made it very easy for you to order your favorite pizza.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 
                    bg-white rounded-2xl shadow-md p-10 max-w-5xl w-full">
      {StepsToOrderPizza.map((step) => (
        <div
          key={step.step}
          className="flex flex-col lg:flex-row items-center lg:items-start"
        >
          {/* Icon Circle */}
          <div
            className="flex items-center justify-center 
                       w-16 h-16 rounded-full 
                       bg-[#0B3D91]/10 text-[#0B3D91] 
                       text-2xl mb-4 lg:mr-5"
          >
            {step.icon}
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold 
                           border-b-2 border-[#E31837] 
                           inline-block mb-3 pb-1">
              {step.step}. {step.title}
            </h3>

            <p className="text-gray-600">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

}

export default HowItWorksSection;
