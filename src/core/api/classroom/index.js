/* eslint-disable no-undef */
import axios from 'axios';

export const createClassroom = (data) => {
  return axios
    .post(`http://localhost:3001/api/classroom/create`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
