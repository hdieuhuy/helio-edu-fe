export const getUserProfile = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const setUserProfile = (data) => {
  const _user = JSON.stringify(data);

  localStorage.setItem('user', _user);
};

export const clearUserProfile = () => {
  localStorage.removeItem('user');
};

export default {};
