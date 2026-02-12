import { useState } from 'react';

// Import Components
import EmailForm from '../../components/ui/Auth/ForgetPassword/EmailForm';
import PasswordForm from '../../components/ui/Auth/ForgetPassword/PasswordForm';
import OTPForm from '../../components/ui/Auth/ForgetPassword/OTPForm';
import Logo from '/android-chrome-512x512.png';

function ForgetPasswordScreen() {
  const [currentStep, setCurrentStep] = useState('EmailForm'); // 'EmailForm' | 'OTPForm' | 'PasswordForm
return (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 bg-gray-50">
    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-10 w-full max-w-6xl">
      
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left mb-10 sm:mb-0 sm:w-1/2">
        <img
          src={Logo}
          alt="SliceIt Logo"
          className="hidden sm:block h-32 w-32 mb-6"
        />

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          <span className="text-[#E31837]">Forgot Password?</span>
        </h1>

        <p className="text-lg text-[#0B3D91] mt-3 font-medium">
          No worries! We'll help you reset it securely.
        </p>
      </div>

      {/* Right Side Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 sm:w-1/2 lg:w-1/3 w-full">
        {currentStep === 'EmailForm' && (
          <EmailForm setCurrentStep={setCurrentStep} />
        )}
        {currentStep === 'OTPForm' && (
          <OTPForm setCurrentStep={setCurrentStep} />
        )}
        {currentStep === 'PasswordForm' && (
          <PasswordForm setCurrentStep={setCurrentStep} />
        )}
      </div>

    </div>
  </section>
);


}

export default ForgetPasswordScreen;
