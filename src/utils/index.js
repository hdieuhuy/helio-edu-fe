export const formatPrice = (value) => {
  return `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default {};
