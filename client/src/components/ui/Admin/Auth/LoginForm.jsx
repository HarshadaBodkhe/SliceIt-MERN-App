import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../Button';
import Loader from '../../Loader';
import Message from '../../Message';

import { loginAdmin } from '../../../../redux/asyncThunks/adminThunks';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.admin);
  const { loading, adminUserLoginError } = admin;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  const forgetPwdHandler = () => {
    console.log('Forget Password');
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full py-20 px-14">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleLogin} className="w-full">
          <p className="text-center text-primary text-xl font-semibold leading-relaxed">
            Sign in to your Account
            <br />
            <span className="text-sm text-secondary">
              You've been Missed!
            </span>
          </p>
          {adminUserLoginError && <Message>{adminUserLoginError}</Message>}

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
               className="w-full text-gray-700 bg-gray-100 placeholder-gray-400 rounded-lg p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all duration-300"

              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="flex justify-center items-center w-full">
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="w-full text-gray-700 bg-gray-100 placeholder-gray-400 rounded-lg p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all duration-300"

              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex items-center">
              <Link
                to="/forget-pwd"
                onClick={forgetPwdHandler}
               className="text-sm text-secondary hover:text-primary transition"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full rounded-md">
            Login
          </Button>
        </form>
      )}
    </>
  );
}

export default AdminLoginForm;
