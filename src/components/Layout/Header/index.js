import React, { useEffect, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Menu, Dropdown } from 'antd';
import Logo from 'src/assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Avatar, Button } from 'src/components';

import useCheckPathName from '../useCheckPathname';
import { clearUserProfile, getUserProfile } from 'src/utils/clientCache';
import { toast } from 'react-toastify';
import { formatPrice } from 'src/utils';

import { HeaderContext } from 'src/contexts/header';

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

  const { headerRefresh } = useContext(HeaderContext);

  const user = getUserProfile();
  const isLogin = !isEmpty(user);

  const listFeature = [
    {
      name: 'Tìm gia sư',
      pathname: '/teacher',
      onClick: () => {
        navigate('/teacher');
      },
    },
    {
      name: 'Đăng ký trở thành gia sư',
      pathname: '/signup/teacher',
      onClick: () => {
        navigate('/signup/teacher');
      },
    },
    {
      name: 'Tin tức',
      pathname: '/news',
      onClick: () => {
        navigate('/news');
      },
    },
  ];

  useEffect(() => {
    if (!isLogin || !isSinglePage) return;

    navigate('/');
  }, [isLogin, isSinglePage]);

  const logOut = () => {
    clearUserProfile();
    toast.success('Đăng xuất thành công!');

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 500);
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            label: (
              <div>
                {isEmpty(user?.profile?.lastName) &&
                isEmpty(user?.profile?.firstName)
                  ? user?.profile?.email?.split('@')[0]
                  : `${user?.profile?.lastName} ${user?.profile?.firstName}`}
                <span style={{ padding: '0 4px' }}>-</span>
                <span>{formatPrice(user?.profile?.money)}</span>
              </div>
            ),
          },
          {
            label: <div onClick={goToProfile}>Hồ sơ cá nhân</div>,
          },
          {
            label: (
              <div onClick={logOut}>
                <MenuItemWrapper>
                  <span>Đăng xuất</span>
                  <Icon icon="clarity:logout-line" />
                </MenuItemWrapper>
              </div>
            ),
          },
        ]}
      />
    ),
    [headerRefresh, user]
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
          <div>
            <Avatar src={user?.profile?.avatar} />
          </div>
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
