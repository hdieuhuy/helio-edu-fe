export const formatPrice = (value) => {
  return `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addHours = (hour) => {
  const date = new Date();
  date.setTime(date.getTime() + hour * 60 * 60 * 1000);

  return date;
};

export default {};
