import React from 'react';
import BugImg from 'src/assets/images/bug.png';

import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components';
import { getScreenMode, useWindowSize } from 'src/utils';

const NotSupportResponsive = () => {
  const navigate = useNavigate();
  const { mobileMode } = getScreenMode(useWindowSize());

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 64,
        padding: '0 16px',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: mobileMode ? 16 : 48,
          textAlign: 'center',
          color: 'var(--black-dark-3)',
          fontFamily: 'var(--font-family-bold)',
          lineHeight: 1.5,
        }}
      >
        Trang hiện tại không hỗ trợ cho màn hình này
      </div>

      <img width={mobileMode ? 240 : 640} src={BugImg} />

      <Button
        type="primary"
        onClick={() => navigate('/')}
        style={{ width: 240, height: 60, fontSize: 24 }}
      >
        Về trang chủ
      </Button>
    </div>
  );
};

export default NotSupportResponsive;
