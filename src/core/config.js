/* eslint-disable no-undef */
export const config =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ENDPOINT
    : process.env.REACT_APP_LOCAL_ENDPOINT;

console.log({ config, env: process.env.NODE_ENV });
export default {};
