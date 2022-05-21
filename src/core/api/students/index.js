/* eslint-disable no-undef */
import axios from 'axios';

export const signUp = (data) => {
  return axios
    .post(`${process.env.REACT_APP_ENDPOINT}/auth/signup`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const verifyAccount = (idActive) => {
  return axios
    .get(`${process.env.REACT_APP_ENDPOINT}/auth/verify/${idActive}`)
    .then((res) => res)
    .catch((error) => error);
};

export default {};
