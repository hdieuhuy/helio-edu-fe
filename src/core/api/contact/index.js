import axios from 'axios';

const API_ENDPOINT = 'https://helio-edu-be.herokuapp.com/api';

export const sendContact = (data) => {
  return axios
    .post(`${API_ENDPOINT}/contact`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
};

export default {};
