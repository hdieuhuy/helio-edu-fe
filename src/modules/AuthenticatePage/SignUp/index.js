import React from 'react';
import { Form, Input } from 'antd';
import { Button } from 'src/components';
import { Link } from 'react-router-dom';

import SignUpBg from 'src/assets/images/sign-up-bg.svg';

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log({ values });
  };

  return (
    <div className="hl-module-signup">
      <div className="container">
        <div className="left">
          <img src={SignUpBg} alt="" />
        </div>

        <div className="divider" />

        <div className="right">
          <div className="title">Đăng ký</div>

          <div className="form-login">
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={onFinish}
            >
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
                label="Mật khẩu"
                name="password"
                type="password"
                rules={[
                  { required: true, message: 'Mật khẩu không được rỗng!' },
                  { min: 6, max: 20, message: 'Mật khẩu phải từ 6-20 kí tự' },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
                rules={[
                  {
                    required: true,
                    message: 'Xác nhận mật khẩu không được rỗng!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật khẩu không trùng khớp')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="actions">
            <div className="signup">
              Bạn đã có tài khoản?
              <Link to="/signin">
                <span>Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
