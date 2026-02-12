import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '/android-chrome-512x512.png';
import AdminLoginForm from '../../components/ui/Admin/Auth/LoginForm';

function AdminLoginScreen() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const admin = useSelector((state) => state.admin);
  const { adminUserInfo } = admin;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (adminUserInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate, adminUserInfo]);

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
          <span className="text-red-600">Welcome Staff!</span>
        </h1>

        <p className="text-lg text-blue-900 mt-3 font-medium">
          Login to manage orders and kitchen updates.
        </p>
      </div>

      {/* Right Side Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 sm:w-1/2 lg:w-1/3 w-full">
        <AdminLoginForm />

        <p className="text-center text-sm text-gray-500 mt-4">
          No Account?{" "}
          <Link
            to="/admin/register"
            className="font-semibold text-red-600 hover:text-blue-800 transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </section>
);

}

export default AdminLoginScreen;
