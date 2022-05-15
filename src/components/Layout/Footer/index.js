import React from 'react';

import Logo from 'src/assets/images/logo.png';

import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <div className="layout__footer">
      <div className="top">
        <div className="brand">
          <img src={Logo} alt="" />
        </div>

        <div className="information">
          <div className="information--item">
            <div className="text">Hệ thống hỗ trợ tìm gia sư</div>
            <div>
              <Icon icon="akar-icons:facebook-fill" />

              <Icon icon="akar-icons:youtube-fill" />
            </div>
          </div>

          <div className="information--item">
            <div className="block">
              <Icon icon="carbon:location-filled" />

              <span>544 Đường Âu Cơ, Phường 10, Tân Bình, TP Hồ Chí Minh</span>
            </div>

            <div className="block">
              <Icon icon="bxs:phone" />

              <span>0767 429 812</span>
            </div>
          </div>

          <div className="information--item">
            <div className="info">
              <div className="key">Mã số doanh nghiệp: </div>
              <div className="value">0123456789</div>
            </div>

            <div className="info">
              <div className="key">Đại diện doanh nghiệp: </div>
              <div className="value">Huỳnh Diệu Huy</div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="bottom">
        <div className="left">
          <span>Điều khoản sử dụng</span>
          <span>Bảo mật</span>
        </div>

        <div className="right">2021 Helio Education. All Rights Reserverd</div>
      </div>
    </div>
  );
};

export default Footer;
