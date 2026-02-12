import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa';

const Message = ({ children }) => {
  const successStyles =
  'bg-green-50 border-l-4 border-green-600 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-start';

const warningStyles =
  'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-4 py-3 rounded-lg shadow-md flex items-start';

const errorStyles =
  'bg-red-50 border-l-4 border-[#E31837] text-[#E31837] px-4 py-3 rounded-lg shadow-md flex items-start';

const infoStyles =
  'bg-blue-50 border-l-4 border-[#0B3D91] text-[#0B3D91] px-4 py-3 rounded-lg shadow-md flex items-start';

  const styles = {
    success: successStyles,
    warning: warningStyles,
    error: errorStyles,
    info: infoStyles,
  };

  const iconComponents = {
    success: FaCheckCircle,
    warning: FaExclamationCircle,
    error: FaTimesCircle,
    info: FaInfoCircle,
  };

  const getStatusText = (status) => {
    if (status >= 200 && status <= 299) {
      return 'Success';
    } else if (status >= 400 && status <= 499) {
      return 'Client Error';
    } else if (status >= 500 && status <= 599) {
      return 'Server Error';
    } else {
      return 'Unknown Status';
    }
  };

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  let alertStyle = '';
  let Icon = '';

  if (children.status >= 200 && children.status <= 299) {
    alertStyle = styles.success;
    Icon = iconComponents.success;
  } else if (children.status >= 400 && children.status <= 499) {
    alertStyle = styles.warning;
    Icon = iconComponents.warning;
  } else if (children.status >= 500 && children.status <= 599) {
    alertStyle = styles.error;
    Icon = iconComponents.error;
  } else {
    alertStyle = styles.info;
    Icon = iconComponents.info;
  }

return (
  <div className={alertStyle} role="alert">
    {Icon && <Icon className="mr-2 mt-1 text-lg" />}
    
    <div>
      <strong className="font-semibold mr-1">
        {getStatusText(children.status)}:
      </strong>
      <span>{children.message}</span>
    </div>
  </div>
);

};

Message.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Message;
