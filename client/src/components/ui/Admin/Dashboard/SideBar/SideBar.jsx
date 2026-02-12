import PropTypes from 'prop-types';

function SideBar({
  menuItems,
  activeMenuItem,
  handleMenuItemClick,
  collapsible,
}) {
  return (
    <div
      className={`bg-primary w-full sm:w-1/6 flex flex-col items-center justify-start shadow-lg pt-16 sm:pt-20 p-4 transform ${collapsible ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out`}
    >

      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-gauge-high mr-2"></i>
        <span className="hidden md:block">Dashboard</span>
      </h2>

      <nav className="text-sm w-full">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-3">
              <button
                onClick={() => handleMenuItemClick(item.name)}
                className={`flex items-center justify-start gap-2 w-full px-4 py-2 rounded-lg text-base text-white transition-all duration-300 ${activeMenuItem === item.name
                    ? 'bg-secondary shadow-md'
                    : 'hover:bg-white/10'
                  }`}

              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

SideBar.propTypes = {
  menuItems: PropTypes.array.isRequired,
  activeMenuItem: PropTypes.string.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  collapsible: PropTypes.bool.isRequired,
};

export default SideBar;
