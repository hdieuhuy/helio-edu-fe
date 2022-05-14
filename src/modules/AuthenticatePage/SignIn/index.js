import React from 'react';
import { Form, Input, Radio } from 'antd';
import { Button } from 'src/components';
import { Link } from 'react-router-dom';

import SignInBg from 'src/assets/images/sign-in-bg.svg';

const SignIn = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log({ values });
  };

  return (
    <div className="hl-module-signin">
      <div className="container">
        <div className="left">
          <img src={SignInBg} alt="" />
        </div>

        <div className="divider" />

        <div className="right">
          <div className="title">Đăng nhập</div>

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
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item label="Bạn là" name="option" initialValue="student">
                <Radio.Group>
                  <Radio value="student">Học sinh</Radio>
                  <Radio value="teacher">Gia sư</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="actions">
            <div className="signup">
              Bạn chưa có tài khoản?
              <Link to="/signup">
                <span>Đăng ký</span>
              </Link>
            </div>

            <div className="forgot">
              <Link to="/forgot">
                <span>Quên mật khẩu?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
