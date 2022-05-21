/* eslint-disable no-undef */
import axios from 'axios';

export const sendContact = (data) => {
  return axios
    .post(`${process.env.REACT_APP_ENDPOINT}/contact`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
