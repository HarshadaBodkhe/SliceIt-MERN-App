import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function SideBarToggleButton({ onClick, isOpen }) {
  return (
    <button
className="flex items-center justify-center fixed left-0 top-20 z-20 m-4 text-white bg-primary/90 hover:bg-secondary backdrop-blur-md transition-all duration-300 rounded-2xl px-3 py-2 text-lg shadow-xl"
      onClick={onClick}
    >
      {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      <span className="hidden sm:block sm:ml-2">
        {isOpen ? ' Collapse' : ' Expand'}
      </span>
    </button>
  );
}

SideBarToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBarToggleButton;
