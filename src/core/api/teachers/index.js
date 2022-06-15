/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const registerTeacher = (data) => {
  return axios
    .post(`${config}/teacher/signup`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const signInTeacher = (data) => {
  return axios
    .post(`${config}/teacher/signin`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const getListTeacher = () => {
  return axios
    .get(`${config}/teacher`)
    .then((res) => res)
    .catch((error) => error);
};

export const getDetailTeacher = (id) => {
  return axios
    .get(`${config}/teacher/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

export default {};
