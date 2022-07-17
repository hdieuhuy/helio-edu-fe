/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const getFeedback = (id) => {
  return axios
    .get(`${config}/feedback/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

export default {};
