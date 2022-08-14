import React, { useEffect, useState, useContext } from 'react';

import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Avatar, Button } from 'src/components';
import { HeaderContext } from 'src/contexts/header';
import { Form, Input, Select, DatePicker, Upload } from 'antd';

import {
  uploadAvatarStudent,
  updateStudentProfile,
} from 'src/core/api/students';
import { getUserProfile, setUserProfile } from 'src/utils/clientCache';
import moment from 'moment';
import { getScreenMode } from 'src/utils';

const IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'jfif'];

const TitleStyle = styled.div`
  font-size: 24px;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 16px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const { Option } = Select;

const FormProfile = () => {
  const [form] = Form.useForm();
  const user = getUserProfile();

  const [, setRefresh] = useState(false);
  const { mobileMode } = getScreenMode();

  const { setRefreshHeader } = useContext(HeaderContext);

  useEffect(() => {
    form.setFieldsValue({
      ...user?.profile,
      ...user?.profile?.address,
      birthday: user?.profile?.birthday
        ? moment(user?.profile?.birthday, 'YYYY-MM-DD')
        : moment(),
    });
  }, []);

  const onFinish = async (values) => {
    const res = await updateStudentProfile({ _id: user?._id, ...values });

    if (res.data.status === 'OK') {
      const _user = {
        ...user,
        profile: {
          ...user?.profile,
          ...res?.data?.data?.profile,
          birthday: moment(values?.birthday),
        },
      };

      setUserProfile(_user);
      setRefresh((state) => !state);
      setRefreshHeader((state) => !state);
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  const handleUploadAvatar = async (info) => {
    if (info?.file?.status === 'uploading') return;

    const file = info?.file?.originFileObj;
    const type = info?.file?.type?.split('/')[1];

    if (!IMAGE_TYPES.includes(type))
      toast.error('File ảnh này không được hỗ trợ');

    const res = await uploadAvatarStudent({ file, id: user?._id });

    if (res.data.status === 'OK') {
      const _user = {
        ...user,
        profile: {
          ...user?.profile,
          avatar: res?.data?.data?.url,
        },
      };

      setUserProfile(_user);
      setRefresh((state) => !state);
      setRefreshHeader((state) => !state);
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div
      className="hl-ml-form-profile"
      style={{ padding: mobileMode ? 16 : 36 }}
    >
      <TitleStyle>Thông tin cá nhân</TitleStyle>

      <Form
        form={form}
        name="signUpTeacher"
        layout="vertical"
        onFinish={onFinish}
      >
        <AvatarContainer>
          <Upload
            name="upload-avatar"
            showUploadList={false}
            onChange={handleUploadAvatar}
          >
            <Avatar src={user?.profile?.avatar} size={64} />
          </Upload>
        </AvatarContainer>

        <Form.Item
          label="Họ"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Họ không được rỗng',
            },
          ]}
        >
          <Input placeholder="Nhập họ" />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Tên không được rỗng',
            },
          ]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Điện thoại không được rỗng',
            },
            {
              pattern: /[0-9]{10}/i,
              message: 'Điện thoại không đúng định dạng',
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Nhập email" disabled />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            flexDirection: mobileMode ? 'column' : 'row',
          }}
        >
          <Form.Item
            label="Giới tính"
            name="gender"
            initialValue="MALE"
            rules={[{ required: true }]}
            style={{ width: '50%', marginRight: 12 }}
          >
            <Select style={{ width: '100%' }}>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngày sinh" name="birthday" style={{ width: '50%' }}>
            <DatePicker placeholder="Ngày sinh" style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item label="Thành phố" name="city">
          <Input placeholder="Nhập thành phố" />
        </Form.Item>

        <Form.Item label="Địa chỉ chi tiết" name="detail">
          <Input placeholder="Nhập địa chỉ chi tiết" />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">
            Đổi thông tin cá nhân
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormProfile;
