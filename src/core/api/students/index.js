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

export const changePassword = (data) => {
  return axios
    .post(`${config}/auth/changepassword`, {
      ...data,
    })
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

export const uploadAvatarStudent = (data) => {
  const formData = new FormData();
  formData.append('image', data.file);
  formData.append('id', data.id);

  return axios
    .post(`${config}/upload/student`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res)
    .catch((error) => error);
};

export const updateStudentProfile = (data) => {
  return axios
    .post(`${config}/auth/update`, { ...data })
    .then((res) => res)
    .catch((error) => error);
};

export const getListStudent = () => {
  return axios
    .get(`${config}/auth`)
    .then((res) => res)
    .catch((error) => error);
};

export default {};
