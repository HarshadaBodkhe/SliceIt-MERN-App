import PropTypes from 'prop-types';
import { BiSolidDownArrow, BiSolidUserDetail } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserDetails } from '../../../redux/asyncThunks/userThunks';

function ProfileBtnAndDropOnNav({
  dropIsOpen,
  setDropIsOpen,
  dropdownRef,
  logoutHandler,
}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const admin = useSelector((state) => state.admin);
  const { adminUserInfo } = admin;

 return (
  <div className="relative" ref={dropdownRef}>
    <button
      type="button"
      onClick={() => setDropIsOpen(!dropIsOpen)}
      className="text-[#0B3D91] hover:text-[#E31837] 
                 border-2 border-[#0B3D91] 
                 rounded-full inline-flex items-center 
                 p-2 transition duration-200 
                 focus:outline-none"
    >
      <FaUserAlt />
      <BiSolidDownArrow className="h-3 ml-1 text-[#0B3D91]" />
    </button>

    {dropIsOpen && (
      <div className="absolute right-0 w-48 
                      bg-white border border-gray-200 
                      rounded-xl shadow-xl mt-4 
                      overflow-hidden">

        {adminUserInfo && (
          <Link
            to="/admin/dashboard"
            onClick={() => setDropIsOpen(!dropIsOpen)}
            className="flex items-center w-full px-4 py-2 
                       text-sm text-[#0B3D91] 
                       hover:bg-blue-50 
                       transition"
          >
            <BiSolidUserDetail className="mr-2" />
            Dashboard
          </Link>
        )}

        {userInfo && (
          <Link
            to="/profile"
            onClick={() => {
              dispatch(getUserDetails({}));
              setDropIsOpen(!dropIsOpen);
            }}
            className="flex items-center w-full px-4 py-2 
                       text-sm text-[#0B3D91] 
                       hover:bg-blue-50 
                       transition"
          >
            <BiSolidUserDetail className="mr-2" />
            Profile
          </Link>
        )}

        <button
          type="button"
          onClick={logoutHandler}
          className="flex items-center w-full px-4 py-2 
                     text-sm text-[#E31837] 
                     hover:bg-red-50 
                     transition"
        >
          <CgLogOut className="mr-2" />
          Logout
        </button>
      </div>
    )}
  </div>
);

}

ProfileBtnAndDropOnNav.propTypes = {
  dropIsOpen: PropTypes.bool.isRequired,
  setDropIsOpen: PropTypes.func.isRequired,
  dropdownRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  logoutHandler: PropTypes.func.isRequired,
};

export default ProfileBtnAndDropOnNav;
