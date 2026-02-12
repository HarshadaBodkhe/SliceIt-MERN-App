import PropTypes from 'prop-types';

function Button({
  variant,
  children,
  className: additionalClassNames,
  ...props
}) {
  let classes = '';

 switch (variant) {
  case 'primary':
    classes =
      'bg-secondary hover:bg-secondary/90 text-white py-3 px-4 my-2 rounded-lg transition-all duration-300';
    break;

  case 'secondary':
    classes =
      'bg-primary hover:bg-primary/90 text-white py-3 px-4 my-2 rounded-lg transition-all duration-300';
    break;

  case 'outline':
    classes =
      'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-white py-3 px-4 my-2 rounded-lg transition-all duration-300';
    break;

  case 'danger':
    classes =
      'bg-red-600 hover:bg-red-700 text-white py-3 px-4 my-2 rounded-lg transition-all duration-300';
    break;

  default:
    classes =
      'bg-secondary hover:bg-secondary/90 text-white py-3 px-4 my-2 rounded-lg transition-all duration-300';
}


  if (additionalClassNames) {
    classes += ` ${additionalClassNames}`;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
