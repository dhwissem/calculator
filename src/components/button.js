import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({ onClick, children }) => <button className="btn" onClick={onClick}>{children}</button>;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Button;
