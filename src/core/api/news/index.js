/* eslint-disable no-undef */
import axios from 'axios';
import { config } from 'src/core/config';

export const getNews = () => {
  return axios
    .get(`${config}/news`)
    .then((res) => res)
    .catch((error) => error);
};

export default {};
