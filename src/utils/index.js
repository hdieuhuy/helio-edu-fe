import { useState, useEffect } from 'react';

export const formatPrice = (value) => {
  return `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addHours = (hour) => {
  const date = new Date();
  date.setTime(date.getTime() + hour * 60 * 60 * 1000);

  return date;
};

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const getScreenMode = () => {
  const _window = useWindowSize();

  return {
    mobileMode: _window.width >= 320 && _window.width <= 767,
    ipadMode: _window.width >= 768 && _window.width <= 1376,
    desktopMode: _window.width >= 1377,
  };
};

export default {};
