import React from 'react';
import { useLocation } from 'react-router-dom';

import Logo from 'src/assets/images/logo.png';

const Header = () => {
  const location = useLocation();
  const pathname = location?.pathname;

  const listOnlyLogoPath = ['/signin', '/signup'];

  if (listOnlyLogoPath?.includes(pathname)) {
    return (
      <div className="layout__header layout__header--onlylogo">
        <div className="logo">
          <img src={Logo} />
        </div>
      </div>
    );
  }

  return (
    <div className="layout__header">
      <div className="logo">
        <img src={Logo} />
      </div>

      <div className="feature">
        <div className="feature-item">Tìm gia sư</div>
        <div className="feature-item">Đăng ký gia sư</div>
        <div className="feature-item">Đăng ký gia sư</div>
      </div>

      <div className="personal">
        <div>abc</div>
      </div>
    </div>
  );
};

export default Header;
