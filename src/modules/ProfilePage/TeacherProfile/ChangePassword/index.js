import React from 'react';
import { Form, Input } from 'antd';
import { Button } from 'src/components';
import { changePasswordTeacher } from 'src/core/api/teachers';
import { toast } from 'react-toastify';

import styled from 'styled-components';
import { getUserProfile } from 'src/utils/clientCache';

const TitleStyle = styled.div`
  font-size: 24px;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 16px;
`;

const ChangePassword = () => {
  const [form] = Form.useForm();
  const user = getUserProfile();

  const onFinish = async (values) => {
    const res = await changePasswordTeacher({
      ...values,
      email: user?.email,
    });

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-change-password" style={{ padding: 36 }}>
      <TitleStyle>Đổi mật khẩu</TitleStyle>

      <Form
        form={form}
        name="change-password"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="password"
          rules={[
            {
              required: true,
              message: 'Mật khẩu hiện tại không được rỗng',
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Xác nhận mật khẩu không được rỗng',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Mật khẩu mới không được rỗng',
            },
            { min: 6, max: 20, message: 'Mật khẩu phải từ 6-20 kí tự' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
