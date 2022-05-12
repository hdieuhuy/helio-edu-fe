import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__container">{children}</div>

      <Footer />
    </div>
  );
};

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
