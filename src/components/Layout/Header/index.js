import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Menu, Dropdown } from 'antd';
import Logo from 'src/assets/images/logo.png';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';
import { Icon } from '@iconify/react';

import useCheckPathName from '../useCheckPathname';

const isLogin = false;

const IconWrapper = styled.div`
  svg {
    font-size: 32px;
    color: var(--primary);
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 4px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isSinglePage = useCheckPathName();

  const menu = (
    <Menu
      items={[
        {
          label: <div>Hồ sơ cá nhân</div>,
        },
        {
          label: (
            <div>
              <MenuItemWrapper>
                <span>Đăng xuất</span>
                <Icon icon="clarity:logout-line" />
              </MenuItemWrapper>
            </div>
          ),
        },
      ]}
    />
  );

  const redirectToLogin = () => {
    navigate('/signin');
  };

  if (isSinglePage) {
    return (
      <div className="layout__header layout__header--onlylogo">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo-header" />
          </Link>
        </div>
      </div>
    );
  }

  const renderPersonal = (
    <div className="personal">
      {isLogin ? (
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <IconWrapper>
            <Icon icon="carbon:user-avatar-filled" />
          </IconWrapper>
        </Dropdown>
      ) : (
        <Button type="primary" onClick={redirectToLogin}>
          Đăng nhập
        </Button>
      )}
    </div>
  );

  return (
    <div className="layout__header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo-header" />
        </Link>
      </div>

      <div className="feature">
        <div className="feature-item">Tìm gia sư</div>
        <div className="feature-item">Đăng ký gia sư</div>
        <div className="feature-item">Đăng ký gia sư</div>
      </div>

      {renderPersonal}
    </div>
  );
};

export default Header;
