/* eslint-disable no-undef */
export const config =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ENDPOINT
    : process.env.REACT_APP_LOCAL_ENDPOINT;

export const socketConfig =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_DOMAIN_BE
    : 'localhost:3001';

export default {};
