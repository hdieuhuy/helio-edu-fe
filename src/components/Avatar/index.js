import React from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { Avatar as AntdAvatar } from 'antd';

const IconWrapper = styled.div`
  svg {
    font-size: 48px;
    color: var(--primary);
  }
`;

const Avatar = ({ src }) => {
  if (isEmpty(src))
    return (
      <IconWrapper>
        <Icon icon="carbon:user-avatar-filled" />
      </IconWrapper>
    );

  return <AntdAvatar size={48} src={src} />;
};

export default Avatar;

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};
