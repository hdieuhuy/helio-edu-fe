import React from 'react';

import HomePage from 'src/modules/HomePage';
import SignIn from 'src/modules/AuthenticatePage/SignIn';
import SignUp from 'src/modules/AuthenticatePage/SignUp';
import ForgotPassword from 'src/modules/AuthenticatePage/ForgotPassword';

const routes = [
  {
    path: '/',
    exact: true,
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/forgot',
    element: <ForgotPassword />,
  },
];

export default routes;
