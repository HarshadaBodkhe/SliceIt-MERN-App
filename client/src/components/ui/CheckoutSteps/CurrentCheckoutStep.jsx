import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';

function CurrentCheckoutStep({ currentStep, AllSteps }) {
return (
  <div className="flex items-center justify-center space-x-2 mb-6 pb-4 border-b border-gray-200">
    {AllSteps.map((step, index) => {
      const isActive = currentStep === step.step;
      const isCompleted = currentStep > step.step;

      return (
        <div key={index} className="flex items-center space-x-2">
          <p
            className={`flex items-center gap-1 font-semibold rounded-full px-3 py-1 text-xs sm:text-sm transition
              ${
                isActive
                  ? "bg-[#0B3D91] text-white" // Active = Domino Blue
                  : isCompleted
                  ? "bg-[#E31837] text-white" // Completed = Domino Red
                  : "bg-gray-200 text-gray-600" // Inactive
              }
            `}
          >
            {step.icon}
            <span className="hidden sm:inline-block">
              {step.step}
            </span>
          </p>

          {index !== AllSteps.length - 1 && (
            <FaChevronRight className="text-gray-400 text-sm sm:text-lg" />
          )}
        </div>
      );
    })}
  </div>
);

}

CurrentCheckoutStep.propTypes = {
  currentStep: PropTypes.string.isRequired,
  AllSteps: PropTypes.array.isRequired,
};

export default CurrentCheckoutStep;
