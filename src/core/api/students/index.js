/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const signUp = (data) => {
  return axios
    .post(`${config}/auth/signup`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const signIn = (data) => {
  return axios
    .post(`${config}/auth/signin`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const verifyAccount = (idActive) => {
  return axios
    .get(`${config}/auth/verify/${idActive}`)
    .then((res) => res)
    .catch((error) => error);
};

export const feedbackForTeacher = (data) => {
  return axios
    .post(`${config}/feedback`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
