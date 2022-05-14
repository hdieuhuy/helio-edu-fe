import React from 'react';
import PropTypes from 'prop-types';

import { Button as AntdButton } from 'antd';

const Button = ({ children, ...rest }) => {
  return (
    <AntdButton className="hl-cp-btn" {...rest}>
      {children}
    </AntdButton>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Button.defaultProps = {
  children: '',
};
