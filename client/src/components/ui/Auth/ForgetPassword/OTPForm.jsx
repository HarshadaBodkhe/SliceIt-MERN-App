import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import { setPasswordResetOTP } from '../../../../redux/slices/userSlice';
import { forgotPassword } from '../../../../redux/asyncThunks/userThunks';

// Import Components
import Button from '../../Button';
import Loader from '../../Loader';
import Message from '../../Message';

function OTPForm({ setCurrentStep }) {
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, userPasswordResetEmail, userForgotPasswordError } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setPasswordResetOTP(otp));
    setInterval(() => {
      setCurrentStep('PasswordForm');
    }, 1000);
  };

  useEffect(() => {
    if (userForgotPasswordError) {
      setInterval(() => {
        setCurrentStep('EmailForm');
      }, 1000);
    }
  }, [userForgotPasswordError, setCurrentStep]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <form
          className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-8"
          onSubmit={submitHandler}
        >

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Verify OTP
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter the OTP sent to your email address
            </p>
          </div>

          {userForgotPasswordError && (
            <Message>{userForgotPasswordError}</Message>
          )}

          <div className="w-full my-4">
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>

            <div className="flex justify-center items-center w-full">
              <input
                type="text"
                id="otp"
                value={otp}
                placeholder="Enter OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"

              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center mb-6">
            <p className="text-sm text-gray-400">
              Didn&apos;t receive OTP?{' '}
              <span
                className="text-primary font-medium cursor-pointer hover:underline"
                onClick={() => {
                  dispatch(
                    forgotPassword({
                      email: userPasswordResetEmail,
                    })
                  );
                }}
              >
                Resend OTP
              </span>
            </p>
          </div>
          <Button type="submit" variant="primary" className="w-full rounded-md">
            Proceed to Reset Password
          </Button>
        </form>
      )}
    </>
  );
}

OTPForm.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default OTPForm;
