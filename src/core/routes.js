import React from 'react';

import HomePage from 'src/modules/HomePage';
import SignIn from 'src/modules/AuthenticatePage/SignIn';
import SignUp from 'src/modules/AuthenticatePage/SignUp';
import ForgotPassword from 'src/modules/AuthenticatePage/ForgotPassword';
import NotFound from 'src/modules/NotFoundPage';
import Verification from 'src/modules/AuthenticatePage/Verification';

import TeachersPage from 'src/modules/TeachersPage';
import SignUpTeacherPage from 'src/modules/SignUpTeacherPage';
import TeacherDetailPage from 'src/modules/TeacherDetailPage';
import ProfilePage from 'src/modules/ProfilePage';
import AdminPage from 'src/modules/AdminPage';
import NewPassword from 'src/modules/AuthenticatePage/NewPassword';

const routes = [
  {
    path: '/',
    exact: true,
    element: <HomePage />,
  },
  {
    path: '/teacher',
    element: <TeachersPage />,
  },
  {
    path: '/teacher/:id',
    exact: true,
    element: <TeacherDetailPage />,
  },
  {
    path: 'signup/teacher',
    element: <SignUpTeacherPage />,
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
  {
    path: '/newpassword/:id',
    element: <NewPassword />,
  },
  {
    path: '/verify/:verifyCode',
    element: <Verification />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
