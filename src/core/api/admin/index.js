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
    .get(`${config}/admin/comments`)
    .then((res) => res)
    .catch((error) => error);
};

export const getSubjectFavorite = () => {
  return axios
    .get(`${config}/admin/subject`)
    .then((res) => res)
    .catch((error) => error);
};
