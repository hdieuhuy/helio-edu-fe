import React from 'react';
import jwtDecode from 'jwt-decode';

import { Form, Input } from 'antd';
import { Button } from 'src/components';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginAdmin } from 'src/core/api/admin';
import { setUserProfile } from 'src/utils/clientCache';

const AdminLoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await loginAdmin(values);

    if (res.data.status === 'OK') {
      const user = jwtDecode(res.data.data.token);

      setUserProfile(user);
      navigate('/admin');
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-forgot" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="title">
          <span>Trang đăng nhập của Admin</span>

          <Icon icon="mdi:shield-account" />
        </div>

        <div className="form-forgot">
          <Form form={form} name="forgot" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email không được rỗng!',
                },
                {
                  type: 'email',
                  message: 'Email khống đúng dạng!',
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Mật khẩu không được rỗng!',
                },
              ]}
            >
              <Input.Password placeholder="Nhập password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="back-to-signin">
          <Link to="/signin">
            <Icon icon="ic:round-keyboard-return" />

            <span>Quay lại đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
