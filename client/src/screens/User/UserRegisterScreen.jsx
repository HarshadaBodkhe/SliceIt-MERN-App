import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import UserRegisterForm from '../../components/ui/Auth/UserRegisterForm';
import Logo from '/android-chrome-512x512.png';

function UserRegisterScreen() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const admin = useSelector((state) => state.admin);
  const { adminUserInfo } = admin;

  useEffect(() => {
    if (userInfo || adminUserInfo) {
      navigate('/');
    }
  }, [navigate, userInfo, adminUserInfo]);
return (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 bg-white">
    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-10 w-full max-w-6xl">
      
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left mb-10 sm:mb-0 sm:w-1/2">
        <img
          src={Logo}
          alt="SliceIt Logo"
          className="hidden sm:block h-32 w-32 mb-6"
        />

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          <span className="text-red-600">Register Now!</span>
        </h1>

        <p className="text-lg text-blue-900 mt-3 font-medium">
          To enjoy our services.
        </p>
      </div>

      {/* Right Side Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 md:w-1/2 w-full">
        <UserRegisterForm />

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an Account?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-600 hover:text-blue-800 transition duration-200"
          >
            Sign in Here
          </Link>
        </p>
      </div>

    </div>
  </section>
);

}

export default UserRegisterScreen;
