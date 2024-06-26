import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/MOR.png';

const Logo = ({ w = '100', h = '100' }) => {
  return (
    <img src={logo} width={w} height={h} alt="Logo" />
  );
};

Logo.propTypes = {
  w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
