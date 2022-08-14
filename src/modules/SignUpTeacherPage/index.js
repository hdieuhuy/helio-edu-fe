import React, { useState } from 'react';
import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import { Button } from 'src/components';
import { registerTeacher } from 'src/core/api/teachers';

import { toast } from 'react-toastify';
import { formatPrice, getScreenMode } from 'src/utils';
import { Icon } from '@iconify/react';

const { Option } = Select;

const SignUpTeacherPage = () => {
  const [form] = Form.useForm();
  const [fileInfo, setFileInfo] = useState({});

  const { mobileMode } = getScreenMode();

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

    'Luyện thi đại học',
    'Luyện chữ',
    'Tài chính',
  ];

  const normFile = (e) => {
    const arrayImage = ['png', 'jpg', 'jpeg', 'pdf'];
    const type = e?.file?.type?.split('/')[1];
    console.log({ e });

    if (e.file.status === 'uploading') return;

    if (!arrayImage.includes(type))
      return toast.error('File này không được hỗ trợ');

    setFileInfo(e);
    form.setFieldsValue({
      file: e.file.originFileObj,
    });
  };

  const onFinish = async (values) => {
    const res = await registerTeacher({
      ...values,
      file: fileInfo.file.originFileObj,
    });

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-signup-teacher">
      <div className="header">
        <div className="title">Đăng ký trở thành gia sư</div>
      </div>

      <div className="form">
        <Form
          form={form}
          name="signUpTeacher"
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="area">
            <div className="heading">Thông tin cá nhân</div>

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

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email không được rỗng',
                },
                {
                  type: 'email',
                  message: 'Email không đúng định dạng',
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <div style={{ display: mobileMode ? 'block' : 'flex' }}>
              <Form.Item
                label="Giới tính"
                name="gender"
                initialValue="MALE"
                rules={[{ required: true }]}
                style={{ width: mobileMode ? '100%' : '50%', marginRight: 12 }}
              >
                <Select style={{ width: '100%' }}>
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                  { required: true, message: 'Giá thuê không được rỗng' },
                ]}
                style={{ width: mobileMode ? '100%' : '50%' }}
              >
                <DatePicker placeholder="Ngày sinh" style={{ width: '100%' }} />
              </Form.Item>
            </div>

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
          </div>

          <Divider />

          <div className="area">
            <div className="heading">Hồ sơ chuyên môn</div>

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
              rules={[
                { required: true, message: 'Tốt nghiệp không được rỗng' },
              ]}
            >
              <Input placeholder="Nhập tốt nghiệp" />
            </Form.Item>

            <Form.Item
              label="Học phí mối giờ"
              name="priceRent"
              rules={[
                {
                  required: true,
                  message: 'Học phí không được rỗng',
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

            <Form.Item
              name="file"
              label="Upload file CV"
              getValueFromEvent={normFile}
            >
              <Upload showUploadList={false}>
                <Button>
                  <Icon
                    icon="akar-icons:cloud-upload"
                    style={{ marginRight: 8 }}
                  />
                  <span>Upload file</span>
                </Button>
              </Upload>
            </Form.Item>

            {fileInfo?.file?.name && (
              <div>
                <Icon icon="akar-icons:file" style={{ marginRight: 8 }} />

                {fileInfo?.file?.name}
              </div>
            )}
          </div>

          <div className="area button">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpTeacherPage;
