import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from './core/routes';

const App = () => {
  return (
    <Routes>
      {routes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            element={item.element}
          />
        );
      })}
    </Routes>
  );
};

export default App;
