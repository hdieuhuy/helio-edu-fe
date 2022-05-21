import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Form, Input } from 'antd';
import { Button, AnimationImage } from 'src/components';
import { toast } from 'react-toastify';

import { sendContact } from 'src/core/api/contact';

import HeaderBg from 'src/assets/images/bg_home.svg';
import AreaBg from 'src/assets/images/area-second-bg.svg';
import TeachingGif from 'src/assets/images/teaching.json';
import StudyingGif from 'src/assets/images/studying.json';
import PersonalStudy from 'src/assets/images/personal-study.json';

const AreaBackgroundWrapper = styled.div`
  background: url(${(props) => props.img});
  background-size: ${(props) => props.size};
  background-position-y: ${(props) => props.positionY};
  background-repeat: ${(props) => props.repeat};
`;

const HomePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await sendContact(values);

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  return (
    <div className="hl-ml-home">
      <AreaBackgroundWrapper
        className="area-first"
        img={HeaderBg}
        size="cover"
        positionY="bottom"
      >
        <div className="title">
          <div>Hế thống hỗ trợ tìm kiếm gia sư</div>

          <span>
            Giáo dục là vũ khí mạnh nhất chúng ta sử dụng để thay đổi thế giới.
          </span>
        </div>

        <Button type="primary" onClick={() => navigate('/')}>
          Tìm gia sư
        </Button>
      </AreaBackgroundWrapper>

      <div className="area-second">
        <div className="area-second--item">
          <AreaBackgroundWrapper
            img={AreaBg}
            className="left"
            positionY="bottom"
            repeat="no-repeat"
          >
            <div className="title">Linh hoạt trong việc học tập, giảng dạy</div>
            <div className="desc">
              Bạn có thể tìm kiếm giáo viên dạy môn phù hợp để bắt đầu quá trình
              học tập
            </div>
          </AreaBackgroundWrapper>

          <div className="right">
            <AnimationImage
              animationData={TeachingGif}
              width={600}
              height={600}
            />
          </div>
        </div>

        <div className="area-second--item even">
          <AreaBackgroundWrapper
            img={AreaBg}
            className="left"
            positionY="bottom"
            repeat="no-repeat"
          >
            <div className="title">Học tập trực tuyến dễ dàng</div>
            <div className="desc">
              Việc học tập ở thời điểm hiện tại khó khăn vì tình hình dịch bệnh
              do nên việc học trực tuyến vô cùng tiện lợi và hiệu quả
            </div>
          </AreaBackgroundWrapper>

          <div className="right">
            <AnimationImage
              animationData={StudyingGif}
              width={600}
              height={600}
            />
          </div>
        </div>

        <div className="area-second--item">
          <AreaBackgroundWrapper
            img={AreaBg}
            className="left"
            positionY="bottom"
            repeat="no-repeat"
          >
            <div className="title">Phương pháp cá nhân hóa học tập</div>
            <div className="desc">
              Mỗi người học có một năng lực tiếp thu kiến thức khác nhau. Cá
              nhân hóa học tập bằng 1 kèm 1, giúp người học ôn lại những kiến
              thức nền tảng căn bản, không tự ti trong việc hỏi bài, dành nhiều
              thời gian hơn cho một chủ đề khó hiểu để theo kịp chương trình
              học.
            </div>
          </AreaBackgroundWrapper>

          <div className="right">
            <AnimationImage
              animationData={PersonalStudy}
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      <div className="area-third">
        <div className="container">
          <div className="title">Đóng góp ý kiến</div>

          <div className="form">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Email không được rỗng' }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                name="name"
                label="Họ tên"
                rules={[{ required: true, message: 'Họ tên không được rỗng' }]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>

              <Form.Item
                name="content"
                label="Nội dung"
                rules={[
                  { required: true, message: 'Nội dung không được rỗng' },
                ]}
              >
                <Input.TextArea rows={6} placeholder="Nhập nội dung" />
              </Form.Item>

              <Form.Item className="btn-form">
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
