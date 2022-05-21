/* eslint-disable no-undef */
import axios from 'axios';

export const registerTeacher = (data) => {
  return axios
    .post(`${process.env.REACT_APP_ENDPOINT}/teacher/signup`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
