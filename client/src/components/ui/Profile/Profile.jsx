import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  const { name, email, address, phoneNumber, isVerified } = user;

 return (
  <div className="flex flex-col justify-center items-center w-full 
                  bg-white shadow-md rounded-2xl p-6">

    <h2 className="text-2xl font-bold text-[#0B3D91] mb-4">
      Hello! {name}
    </h2>

    <div className="space-y-2 text-center">

      <div>
        <span className="text-sm text-[#0B3D91] font-semibold">
          Email:
        </span>{' '}
        <span className="text-gray-700">{email}</span>
      </div>

      <div>
        <span className="text-sm text-[#0B3D91] font-semibold">
          Address:
        </span>{' '}
        <span className="text-gray-700">{address}</span>
      </div>

      <div>
        <span className="text-sm text-[#0B3D91] font-semibold">
          Phone:
        </span>{' '}
        <span className="text-gray-700">{phoneNumber}</span>
      </div>

      <div>
        <span className="text-sm text-[#0B3D91] font-semibold">
          Account Status:
        </span>{' '}
        <span
          className={`font-semibold ${
            isVerified ? 'text-green-600' : 'text-[#E31837]'
          }`}
        >
          {isVerified ? 'Verified' : 'Not Verified'}
        </span>
      </div>

    </div>
  </div>
);

};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
