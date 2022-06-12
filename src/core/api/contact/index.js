/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const sendContact = (data) => {
  return axios
    .post(`${config}/contact`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
