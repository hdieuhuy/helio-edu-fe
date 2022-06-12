/* eslint-disable no-undef */
export const config =
  process.env.REACT_APP_ENV_NODE === 'production'
    ? process.env.REACT_APP_ENDPOINT
    : process.env.REACT_APP_LOCAL_ENDPOINT;

export default {};
