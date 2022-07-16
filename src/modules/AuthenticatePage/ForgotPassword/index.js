import React from 'react';
import { Form, Input } from 'antd';
import { Button } from 'src/components';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { forgotPassword } from 'src/core/api/students';

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res = await forgotPassword(values);

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-forgot">
      <div className="container">
        <div className="title">
          <span>Quên mật khẩu</span>

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

export default ForgotPassword;
