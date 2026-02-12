import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import {
  getUserDetails,
  updateUserProfile,
} from '../../../redux/asyncThunks/userThunks';

function EditProfileForm({ setIsEditing }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, userUpdateProfileError, userDetails } = user;

  const initialFormData = {
    name: userDetails.name,
    email: userDetails.email,
    address: userDetails.address,
    phoneNumber: userDetails.phoneNumber,
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData)).then(() => {
      setIsEditing(false);
      dispatch(getUserDetails({}));
    });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <>
        {userUpdateProfileError && (
          <Message>{userUpdateProfileError}</Message>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 my-2">

            {/* Name */}
            <div className="w-full">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFieldChange}
                placeholder="Full Name"
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder="Email Address"
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                placeholder="Enter your Address"
                onChange={handleFieldChange}
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Phone */}
            <div className="w-full">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={handleFieldChange}
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                onChange={handleFieldChange}
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#E31837]"
              />
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleFieldChange}
                className="w-full text-gray-800 bg-gray-100 
                           placeholder-gray-400 rounded-md 
                           p-4 text-sm shadow-sm 
                           focus:outline-none 
                           focus:ring-2 focus:ring-[#E31837]"
              />
            </div>

          </div>

          <div className="flex flex-row justify-between mt-4">
            <Button
              type="submit"
              variant="primary"
              className="rounded-md bg-[#0B3D91] hover:bg-blue-800 text-white px-6"
            >
              Save Changes
            </Button>

            <Button
              variant="danger"
              className="rounded-md bg-[#E31837] hover:bg-red-700 text-white px-6"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </>
    )}
  </>
);

}

EditProfileForm.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default EditProfileForm;
