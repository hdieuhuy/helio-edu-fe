import React from 'react';
import PropTypes from 'prop-types';

import Lottie from 'react-lottie';

const AnimationImage = ({ animationData, width, height, style }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={style}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default AnimationImage;

AnimationImage.propTypes = {
  animationData: PropTypes.any.isRequired,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  style: PropTypes.object,
};
