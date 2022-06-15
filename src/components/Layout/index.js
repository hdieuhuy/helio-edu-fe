import React from 'react';
import PropTypes from 'prop-types';
import useCheckPathName from './useCheckPathname';

import Footer from './Footer';
import Header from './Header';

import { HeaderProvider } from 'src/contexts/header';

const DefaultLayout = ({ children }) => {
  const isSinglePage = useCheckPathName();

  return (
    <div className="layout">
      <HeaderProvider>
        <Header />

        <div className="layout__container">{children}</div>

        {!isSinglePage && <Footer />}
      </HeaderProvider>
    </div>
  );
};

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
