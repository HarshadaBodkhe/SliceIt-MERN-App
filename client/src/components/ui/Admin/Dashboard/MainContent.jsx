import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Import Components
import Home from './Home';
import InventoryList from './Lists/InventoryList';
import OrdersList from './Lists/OrdersList';
import PizzasList from './Lists/PizzasList';
import StaffList from './Lists/StaffList';
import UsersList from './Lists/UsersList';
import SideBarToggleButton from './SideBar/SideBarToggleButton';

function MainContent({ activeMenuItem, collapsible, onToggleSidebar }) {
  const admin = useSelector((state) => state.admin);
  const { adminUserInfo } = admin;

  const formattedUserName = adminUserInfo.name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(' ');

  return (
    <div
      className={`bg-gray-200 min-h-screen ${collapsible ? 'w-10/12' : 'w-full'
        } transition-all duration-300 ease-in-out p-8`}
    >

      <SideBarToggleButton onClick={onToggleSidebar} isOpen={collapsible} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-8">
          Welcome to Admin Panel
          <span className="text-secondary"> {formattedUserName}</span>!
        </h1>
        {activeMenuItem === 'Home' && <Home />}
        {activeMenuItem === 'Staff' && <StaffList />}
        {activeMenuItem === 'Users' && <UsersList />}
        {activeMenuItem === 'Pizzas' && <PizzasList />}
        {activeMenuItem === 'Orders' && <OrdersList />}
        {activeMenuItem === 'Inventory' && <InventoryList />}
      </div>
    </div>
  );
}

MainContent.propTypes = {
  activeMenuItem: PropTypes.string.isRequired,
  collapsible: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default MainContent;
