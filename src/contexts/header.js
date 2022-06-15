import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const HeaderContext = createContext(null);
const { Provider } = HeaderContext;
const HeaderConsumer = HeaderContext.Consumer;

const HeaderProvider = ({ children }) => {
  const [refreshHeader, setRefreshHeader] = useState(false);

  return (
    <Provider value={{ refreshHeader, setRefreshHeader }}>{children}</Provider>
  );
};

export { HeaderProvider, HeaderContext, HeaderConsumer };

HeaderProvider.propTypes = {
  children: PropTypes.any,
};
