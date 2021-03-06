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
      toast.error('File ???nh n??y kh??ng ???????c h??? tr???');

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
    <div className="hl-ml-form-profile" style={{ padding: 36 }}>
      <TitleStyle>Th??ng tin c?? nh??n</TitleStyle>

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
          label="H???"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'H??? kh??ng ???????c r???ng',
            },
          ]}
        >
          <Input placeholder="Nh???p h???" />
        </Form.Item>

        <Form.Item
          label="T??n"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'T??n kh??ng ???????c r???ng',
            },
          ]}
        >
          <Input placeholder="Nh???p t??n" />
        </Form.Item>

        <Form.Item
          label="S??? ??i???n tho???i"
          name="phone"
          rules={[
            {
              required: true,
              message: '??i???n tho???i kh??ng ???????c r???ng',
            },
            {
              pattern: /[0-9]{10}/i,
              message: '??i???n tho???i kh??ng ????ng ?????nh d???ng',
            },
          ]}
        >
          <Input placeholder="Nh???p s??? ??i???n tho???i" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Nh???p email" disabled />
        </Form.Item>

        <div style={{ display: 'flex' }}>
          <Form.Item
            label="Gi???i t??nh"
            name="gender"
            initialValue="MALE"
            rules={[{ required: true }]}
            style={{ width: '50%', marginRight: 12 }}
          >
            <Select style={{ width: '100%' }}>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">N???</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ng??y sinh" name="birthday" style={{ width: '50%' }}>
            <DatePicker placeholder="Ng??y sinh" style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item label="Th??nh ph???" name="city">
          <Input placeholder="Nh???p th??nh ph???" />
        </Form.Item>

        <Form.Item label="?????a ch??? chi ti???t" name="detail">
          <Input placeholder="Nh???p ?????a ch??? chi ti???t" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            ?????i th??ng tin c?? nh??n
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormProfile;
