import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import { resetPassword } from '../../../../redux/asyncThunks/userThunks';
import {
  setPasswordResetOTP,
  setPasswordResetEmail,
} from '../../../../redux/slices/userSlice';

// Import Components
import Button from '../../Button';
import Loader from '../../Loader';
import Message from '../../Message';

function PasswordForm({ setCurrentStep }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const {
    loading,
    userPasswordResetOTP,
    userPasswordResetEmail,
    userResetPasswordError,
    userResetPasswordSuccess,
  } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        email: userPasswordResetEmail,
        resetToken: userPasswordResetOTP,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      })
    ).then(() => {
      dispatch(setPasswordResetOTP(''));
      dispatch(setPasswordResetEmail(''));
    });
  };

  useEffect(() => {
    if (userResetPasswordError) {
      setInterval(() => {
        setCurrentStep('EmailForm');
      }, 1000);
    }
  }, [userResetPasswordError, setCurrentStep]);

  useEffect(() => {
    if (userResetPasswordSuccess) {
      navigate('/login');
      setInterval(() => {
        setCurrentStep('EmailForm');
      }, 1000);
    }
  }, [userResetPasswordSuccess, setCurrentStep, navigate]);

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
              Create New Password
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter and confirm your new password
            </p>
          </div>


          {userResetPasswordError && (
            <Message>{userResetPasswordError}</Message>
          )}

          <div className="w-full mb-6">

            <label htmlFor="password" className="sr-only">
              New Password
            </label>

            <div className="flex justify-center items-center w-full">
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"

              />
            </div>
          </div>
          <div className="w-full mb-6">

            <label htmlFor="confirmPassword" className="sr-only">
              Confirm New Password
            </label>

            <div className="flex justify-center items-center w-full">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"

              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full rounded-md">
            Verify OTP & Reset Password
          </Button>
        </form>
      )}
    </>
  );
}

PasswordForm.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default PasswordForm;
