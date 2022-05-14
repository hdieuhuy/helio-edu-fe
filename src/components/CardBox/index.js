import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const CardBox = ({ children, ...rest }) => {
  return (
    <Card className="hl-cp-card-box" {...rest}>
      {children}
    </Card>
  );
};

export default CardBox;

CardBox.propTypes = {
  children: PropTypes.element,
  rest: PropTypes.objectOf(PropTypes.any),
};

CardBox.defaultProps = {
  children: <div />,
  rest: {},
};
