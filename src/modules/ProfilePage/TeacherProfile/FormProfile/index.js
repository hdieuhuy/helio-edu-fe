import React, { useEffect, useState, useContext } from 'react';

import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Avatar, Button } from 'src/components';
import { HeaderContext } from 'src/contexts/header';
import { Form, Input, Select, DatePicker, Upload, InputNumber } from 'antd';

import {
  uploadAvatarTeacher,
  updateTeacherProfile,
} from 'src/core/api/teachers';
import { getUserProfile, setUserProfile } from 'src/utils/clientCache';
import { formatPrice } from 'src/utils';
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

  const listSubjects = [
    'Văn học',
    'Hoá học',
    'Toán học',
    'Tiếng anh',
    'Sinh học',
    'Vật lý',
    'Lịch sử',
    'Địa lý',
    'Giáo dục công nhân',
    'Tin học',
    'Ngoại ngữ khác',

    'Năng khiếu',
    'Luyện thi đại học',
    'Luyện chữ',
    'Tài chính',
  ];

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
    const res = await updateTeacherProfile({ _id: user?._id, ...values });

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

    const res = await uploadAvatarTeacher({ file, id: user?._id });

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

        <div style={{ display: 'flex' }}>
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

        <Form.Item
          label="Mô tả bản thân"
          name="introduce"
          rules={[
            { required: true, message: 'Mô tả không được rỗng' },
            {
              min: 10,
              max: 1500,
              message: 'Giới hạn từ 10 - 1500 ký tự',
            },
          ]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Hãy mô tả ngắn về bản thân từ 10 - 1500 ký tự"
          />
        </Form.Item>

        <Form.Item
          label="Bạn là:"
          name="work"
          initialValue="Sinh viên"
          rules={[{ required: true }]}
        >
          <Select style={{ width: '100%' }}>
            <Option value="Sinh viên">Sinh viên</Option>
            <Option value="Người đi làm">Người đi làm</Option>
            <Option value="Giáo viên">Giáo viên</Option>
            <Option value="Giảng viên">Giảng viên</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tốt nghiệp hoặc đang học tại"
          name="graduate"
          rules={[{ required: true, message: 'Tốt nghiệp không được rỗng' }]}
        >
          <Input placeholder="Nhập tốt nghiệp" />
        </Form.Item>

        <Form.Item
          label="Học phí mối giờ"
          name="priceRent"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => formatPrice(value)}
            parser={(value) => value.replace(/VND\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="Môn học có thể dạy"
          name="subjects"
          rules={[{ required: true, message: 'Hãy chọn 1 môn' }]}
          style={{ width: '100%' }}
        >
          <Select mode="multiple">
            {listSubjects.map((item, index) => (
              <Option value={item} key={`subject-item-${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi thông tin cá nhân
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormProfile;
