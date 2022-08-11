import axios from 'axios';
import { config } from 'src/core/config';

export const getAdminTotal = () => {
  return axios
    .get(`${config}/admin`)
    .then((res) => res)
    .catch((error) => error);
};

export const getTopTeacherAdmin = () => {
  return axios
    .get(`${config}/admin/top-teacher`)
    .then((res) => res)
    .catch((error) => error);
};

export const getComments = () => {
  return axios
    .get(`${config}/admin/comment`)
    .then((res) => res)
    .catch((error) => error);
};

export const getSubjectFavorite = () => {
  return axios
    .get(`${config}/admin/subject/${123}`)
    .then((res) => res)
    .catch((error) => error);
};

export const loginAdmin = (data) => {
  return axios
    .post(`${config}/admin/signin`, { ...data })
    .then((res) => res)
    .catch((error) => error);
};
