import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import classNames from 'classnames';

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
  const { pathname } = useLocation();
  const isSinglePage = useCheckPathName();

  const listFeature = [
    {
      name: 'Tìm gia sư',
      pathname: '/teachers',
      onClick: () => {
        navigate('/teachers');
      },
    },
    {
      name: 'Đăng ký gia sư',
      pathname: '/signup/teacher',
      onClick: () => {
        navigate('/signup/teacher');
      },
    },
  ];

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

  const renderFeatures = (
    <div className="feature">
      {listFeature.map((item, index) => (
        <div
          className={classNames('feature-item', {
            active: pathname === item.pathname,
          })}
          key={`feature-item-${index}`}
          onClick={item.onClick}
        >
          {item.name}
        </div>
      ))}
    </div>
  );

  return (
    <div className="layout__header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo-header" />
        </Link>
      </div>

      {renderFeatures}

      {renderPersonal}
    </div>
  );
};

export default Header;
