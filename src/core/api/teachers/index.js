/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const registerTeacher = (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('email', data.email);
  formData.append('birthday', data.birthday);
  formData.append('firstName', data.firstName);
  formData.append('gender', data.gender);
  formData.append('graduate', data.graduate);
  formData.append('introduce', data.introduce);
  formData.append('lastName', data.lastName);
  formData.append('phone', data.phone);
  formData.append('priceRent', data.priceRent);
  formData.append('subjects', data.subjects);
  formData.append('work', data.work);

  return axios
    .post(`${config}/teacher/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

export const changePasswordTeacher = (data) => {
  return axios
    .post(`${config}/teacher/changepassword`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export const uploadAvatarTeacher = (data) => {
  const formData = new FormData();
  formData.append('image', data.file);
  formData.append('id', data.id);

  return axios
    .post(`${config}/upload/teacher`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res)
    .catch((error) => error);
};

export const updateTeacherProfile = (data) => {
  return axios
    .post(`${config}/teacher/update`, { ...data })
    .then((res) => res)
    .catch((error) => error);
};

export const activeTeacher = (id) => {
  return axios
    .post(`${config}/teacher/active/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

export const changeWork = (data) => {
  return axiox
    .post(`${config}/teacher/teach`, { ...data })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
