/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const createClassroom = (data) => {
  return axios
    .post(`${config}/classroom/create`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
