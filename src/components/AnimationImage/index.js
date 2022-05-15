import React from 'react';
import PropTypes from 'prop-types';

import Lottie from 'react-lottie';

const AnimationImage = ({ animationData, width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default AnimationImage;

AnimationImage.propTypes = {
  animationData: PropTypes.any.isRequired,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
};
