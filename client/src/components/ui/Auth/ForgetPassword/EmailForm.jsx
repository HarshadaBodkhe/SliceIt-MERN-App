import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import { forgotPassword } from '../../../../redux/asyncThunks/userThunks';
import { setPasswordResetEmail } from '../../../../redux/slices/userSlice';

// Import Components
import Button from '../../Button';
import Loader from '../../Loader';
import Message from '../../Message';

function EmailForm({ setCurrentStep }) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, userForgotPasswordError, userForgotPasswordSuccess } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setPasswordResetEmail(email));
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (userForgotPasswordSuccess) {
      setCurrentStep('OTPForm');
    }
  }, [userForgotPasswordSuccess, setCurrentStep]);
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
              Reset Password
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your email address to receive an OTP
            </p>
          </div>

          {userForgotPasswordError && (
        <Message>{userForgotPasswordError}</Message>
      )}
      <div className="w-full my-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="flex justify-center items-center w-full">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full rounded-md">
        Send OTP
      </Button>
    </form >
      )
}
    </>
  );
}

EmailForm.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default EmailForm;
