import React from 'react';
import PropTypes from 'prop-types';
import useCheckPathName from './useCheckPathname';

import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }) => {
  const isSinglePage = useCheckPathName();

  return (
    <div className="layout">
      <Header />

      <div className="layout__container">{children}</div>

      {!isSinglePage && <Footer />}
    </div>
  );
};

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
