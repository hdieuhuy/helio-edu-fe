import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Form, Input } from 'antd';
import { Button, AnimationImage, Avatar } from 'src/components';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';

import { sendContact } from 'src/core/api/contact';
import { getListTeacher } from 'src/core/api/teachers';

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

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListTeacher();

      setTeachers(res?.data?.data?.teachers);
    };

    getTeachers();
  }, []);

  const onFinish = async (values) => {
    const res = await sendContact(values);

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  const goDetailTeacher = (id) => {
    navigate(`/teacher/${id}`);
  };

  return (
    <div className="hl-ml-home">
      <AreaBackgroundWrapper
        className="area-first animate__animated animate__backInDown"
        img={HeaderBg}
        size="cover"
        positionY="bottom"
      >
        <div className="title">
          <div>Hệ thống hỗ trợ tìm kiếm gia sư</div>

          <span>
            Giáo dục là vũ khí mạnh nhất chúng ta sử dụng để thay đổi thế giới.
          </span>
        </div>

        <Button type="primary" onClick={() => navigate('/teacher')}>
          Tìm gia sư
        </Button>
      </AreaBackgroundWrapper>

      <div className="area-services">
        <Slider dots autoplay>
          <div className="services-item">
            <div className="label">Minh bạch</div>

            <div className="content">
              <div>
                <div className="key">
                  Vấn đề: <Icon icon="icon-park-outline:thinking-problem" />
                </div>
                <div className="value">
                  Học viên và Phụ huynh chưa thể nhận thông tin đầy đủ về các
                  gia sư cũng như các trung tâm gia sư thông thường. Dẫn đến
                  việc tìm được gia sư phù hợp trở nên khó khăn
                </div>
              </div>

              <div>
                <div className="key">
                  Giải pháp: <Icon icon="icons8:idea" />
                </div>
                <div className="value">
                  Giải pháp Với HelioEducation, Học viên sẽ được học với những
                  gia sư Uy tín, đã được xác nhận Lý lịch tư pháp và chỉ trả
                  đúng học phí theo thỏa thuận trong hợp đồng điện tử, không mất
                  thêm phí hoa hồng.
                </div>
              </div>
            </div>
          </div>

          <div className="services-item">
            <div className="label">Chất lượng</div>

            <div className="content">
              <div>
                <div className="key">
                  Vấn đề: <Icon icon="icon-park-outline:thinking-problem" />
                </div>
                <div className="value">
                  Học viên và Phụ huynh chưa thể nhận thông tin về năng lực sư
                  phạm của Gia Sư. Mặc dù bằng cấp và các chứng chỉ có thể điểm
                  so sánh chính, nhưng chính khả năng sư phạm sẽ đóng vai trò
                  lớn trong việc truyền đạt thông tin
                </div>
              </div>

              <div>
                <div className="key">
                  Giải pháp: <Icon icon="icons8:idea" />
                </div>
                <div className="value">
                  Học viên sẽ tìm được gia sư Chất lượng nhất dựa trên Hồ sơ cá
                  nhân và phản hồi của học viên đã từng học. Học viên sẽ tìm gia
                  sư được với Chi phí tốt nhất và cách dạy phù hợp nhất dựa trên
                  hình thức “đấu thầu”.
                </div>
              </div>
            </div>
          </div>

          <div className="services-item">
            <div className="label">Tin cậy</div>

            <div className="content">
              <div>
                <div className="key">
                  Vấn đề: <Icon icon="icon-park-outline:thinking-problem" />
                </div>
                <div className="value">
                  Học viên và Phụ huynh cần có 1 giải pháp toàn diện để có thể
                  kết hợp việc học online - học offline - quản lý sư phạm. Việc
                  sử dụng nhiều công cụ khác nhau để thao tác các công việc có
                  thể tạo nên nhiều bất tiện.
                </div>
              </div>

              <div>
                <div className="key">
                  Giải pháp: <Icon icon="icons8:idea" />
                </div>
                <div className="value">
                  HelioEducation mang đến Lựa chọn đa dạng dành cho học viên từ
                  danh sách gia sư đăng ký dạy với các mức giá, hình thức học
                  online.
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

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
              Bạn tự chọn một gia sư phù hợp ở bất kỳ đâu để bắt đầu học 1 kèm 1
              online. HelioEducation đã chọn những gia sư giỏi, có kinh nghiệm
              để đồng hành giúp bạn đạt mục tiêu học tập.
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
              Việc học trực tuyến khi lựa chọn chú ý tới môi trường học tập là
              việc cần được lưu ý. Với môi trường phù hợp, tạo nên cảm giác
              thoải mái nhất chắc chắn sẽ giúp quá trình học tập có được hứng
              thú, việc tiếp thu kiến thức, tiếp nhận thông tin cũng trở nên
              hiệu quả hơn.
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

      <div className="area-teacher">
        <div className="title">Gợi ý gia sư cho bạn</div>

        <div className="teacher-wrapper">
          {teachers
            ?.slice(0, 3)
            ?.filter((item) => item?.active)
            ?.map((item, index) => (
              <div className="teacher-info" key={`teacher-key-${index}`}>
                <div className="avatar">
                  <Avatar src={item.profile.avatar} />
                </div>

                <div className="name">
                  {item.profile.lastName} {item.profile.firstName}
                </div>

                <div className="box-info">
                  <div className="key">Học vấn:</div>
                  <div className="value">{item.profile.graduate}</div>
                </div>

                <div className="box-info">
                  <div className="key">Công việc:</div>
                  <div className="value">{item.profile.work}</div>
                </div>

                <div className="box-info">
                  <div className="key">Học vấn:</div>
                  <div className="value">
                    {item.profile.subjects.map((el, idx) => {
                      if (idx === item.profile.subjects.length - 1) return el;

                      return `${el}, `;
                    })}
                  </div>
                </div>

                <div className="actions">
                  <Button
                    type="primary"
                    onClick={() => goDetailTeacher(item._id)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
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
