import { useEffect, useRef, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// Import Actions
import { clearAdminUserData } from '../../redux/slices/adminSlice';
import { clearCartData } from '../../redux/slices/cartSlice';
import { clearPizzaData } from '../../redux/slices/pizzaSlice';
import { clearUserData } from '../../redux/slices/userSlice';
import { clearOrderData } from '../../redux/slices/orderSlice';
import { clearInventoryData } from '../../redux/slices/inventorySlice';

// Import Images
import Logo from '/android-chrome-192x192.png';

// Import Components
import Button from '../ui/Button';
import CartButton from '../ui/Cart/CartButton';
import CartModal from '../ui/Cart/CartModal/CartModal';
import ProfileBtnAndDropOnNav from '../ui/Profile/ProfileBtnAndDropOnNav';

function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropIsOpen, setDropIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const [loginDropOpen, setLoginDropOpen] = useState(false);

  const dropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropIsOpen(false);
      }

      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setLoginDropOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const NavItems = [
    { route: '/', name: 'Home' },
    { route: '/menu', name: 'Menu' },
    { route: '/my-orders', name: 'My Orders' },
    { route: '/about', name: 'About' },
  ];

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { adminUserInfo } = useSelector((state) => state.admin);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(clearUserData());
    dispatch(clearPizzaData());
    dispatch(clearAdminUserData());
    dispatch(clearCartData());
    dispatch(clearOrderData());
    dispatch(clearInventoryData());
    setDropIsOpen(false);
  };

  return (
    <>
<nav className="fixed top-0 left-0 w-full z-50 bg-primary flex items-center justify-between px-6 sm:px-16 shadow-md h-16">
        <NavLink
          to="/" className="flex items-center text-white font-bold text-lg sm:text-3xl"
        >
          <img
            src={Logo}
            alt="SliceIt Logo"
            className="h-10 w-10 sm:h-14 sm:w-14 mr-2"
          />
          SliceIt
        </NavLink>

        {/* Desktop Menu */}
        <div className="space-x-4 hidden md:inline-flex">
          {NavItems.map((navItem, index) => (
            <NavLink
              key={index}
              to={navItem.route}
              className={({ isActive }) =>
                isActive
                  ? 'text-lg text-white border-b-4 border-secondary'
                  : 'text-lg text-white hover:text-secondary transition'

              }
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <CartButton onClick={() => setCartIsOpen(!cartIsOpen)}>
            {cartItems ? cartItems.length : 0}
          </CartButton>

          {userInfo || adminUserInfo ? (
            <ProfileBtnAndDropOnNav
              dropIsOpen={dropIsOpen}
              setDropIsOpen={setDropIsOpen}
              dropdownRef={dropdownRef}
              logoutHandler={logoutHandler}
            />
          ) : (
            <div
              className="relative hidden md:inline-flex"
              ref={loginDropdownRef}
            >
              <Button
                variant="primary"
                type="button"
                onClick={() => setLoginDropOpen(!loginDropOpen)}
                className="font-medium py-2 px-4 rounded-full inline-flex items-center"
              >
                <CgLogIn className="mr-2" />
                Login / Register
              </Button>

              {loginDropOpen && (
                <div className="absolute right-0 mt-12 w-40 bg-white sbg-white shadow-lg rounded-xl border border-gray-200">
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setLoginDropOpen(false)}
                  >
                    User
                  </Link>

                  <Link
                    to="/admin/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setLoginDropOpen(false)}
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-center space-y-6 md:hidden">
          {NavItems.map((navItem, index) => (
            <NavLink
              key={index}
              to={navItem.route}
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white hover:text-secondary transition"

            >
              {navItem.name}
            </NavLink>
          ))}

          <Link to="/login" onClick={() => setIsOpen(false)}>
            <Button variant="outline">User Login</Button>
          </Link>

          <Link to="/admin/login" onClick={() => setIsOpen(false)}>
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      )}

      {cartIsOpen && (
        <CartModal onClose={() => setCartIsOpen(false)} />
      )}
    </>
  );
}

export default MainNavbar;

