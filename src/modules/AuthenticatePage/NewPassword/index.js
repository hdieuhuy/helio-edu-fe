import React from 'react';
import { Form, Input } from 'antd';
import { Button } from 'src/components';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { newPassword } from 'src/core/api/students';

const NewPassword = () => {
  const [form] = Form.useForm();

  const { id } = useParams();

  const onFinish = async (values) => {
    const res = await newPassword({
      idForgot: id,
      newPassword: values.password,
    });

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-new-password">
      <div className="container">
        <div className="title">
          <span>Đổi Mới mật khẩu</span>

          <Icon icon="mdi:shield-account" />
        </div>

        <div className="form-forgot">
          <Form form={form} name="forgot" layout="vertical" onFinish={onFinish}>
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
              <Input.Password placeholder="Nhập xác nhận mật khẩu" />
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

export default NewPassword;
