import React, { useContext, useEffect, useState } from 'react';

import { Input, Modal, Rate, Select, Tag } from 'antd';
import { Icon } from '@iconify/react';
import { SocketContext } from 'src/contexts/socket';

import { createClassroom } from 'src/core/api/classroom';
import { Button } from 'src/components';
import { addHours, formatPrice } from 'src/utils';
import { toast } from 'react-toastify';
import { getUserProfile } from 'src/utils/clientCache';

const TeacherDetailPage = () => {
  const { socket } = useContext(SocketContext);

  const [data, setData] = useState({});
  const [hour, setHour] = useState(1);
  const [isModalFeedback, setModalFeedback] = useState(false);

  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');

  const user = getUserProfile();

  const isCurrentStudent = user?._id === data?.student?._id;

  useEffect(() => {
    socket.on('BE_CLASSROOM_PENDING', (res) => {
      setData(res);
    });

    socket.on('BE_CLASSROOM_ACTIVE', (res) => {
      setData(res);
    });

    socket.on('BE_CLASSROOM_CLOSE', (res) => {
      setData(res);
    });

    socket.on('BE_CLASSROOM_DONE', (res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (data?.status !== 'CLOSE' || !isCurrentStudent) return;

    toast('Giáo viên đã từ chối giảng dạy');
  }, [data]);

  useEffect(() => {
    if (data?.status !== 'DONE' || !isCurrentStudent) return;

    setModalFeedback(true);
  }, [data]);

  const handleCreateClassroom = () => {
    createClassroom({
      teacherID: '6288fc67f66f16e695946f44',
      studentID: '62891cdc8258bd7b19a7d625',
      startTime: new Date(),
      endTime: addHours(hour),
    });
  };

  const handleFeedbackTeacher = () => {
    console.log({ content, rate });
  };

  return (
    <div className="hl-ml-teacher-detail">
      <div className="container">
        <div className="left-side">
          <div className="box-info">
            <div className="avatar">
              <img
                src="https://haycafe.vn/wp-content/uploads/2022/01/Avt-meo-ff-cute-qua.jpg"
                alt=""
              />

              <div className="work">Sinh Viên</div>
            </div>

            <div className="main">
              <div className="full-name">Nguyễn Ngọc Tuấn</div>

              <div className="graduate">Tốt nghiệp Đại học Bách Khoa</div>

              <div className="subjects">
                <div className="label">Môn dạy</div>

                <div className="subject-item">
                  <Tag color="green">Toán</Tag>
                  <Tag color="green">Văn Học</Tag>
                  <Tag color="green">Hoá Học</Tag>
                  <Tag color="green">Hoá Học</Tag>
                </div>
              </div>
            </div>
          </div>

          <div className="box-info profile">
            <div className="label">Hồ sơ cá nhân</div>

            <div className="information">
              <div className="info-item">Tuổi - 34</div>

              <div className="info-item">Giới tính - Nam</div>

              <div className="introduce">
                Có nhiều năm kinh nghiệm dạy 1 kèm 1 online, giúp học sinh đạt
                điểm cao môn Toán và Lý. Chuyên luyện thi Khối A môn Toán và Lý
                vào các trường Top điểm đầu vào cao
              </div>
            </div>
          </div>

          <div className="box-info verify">
            <div className="label">Hồ sơ đã được xác thực</div>

            <div className="verify-wrapper">
              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>
                  Đã xác thực thông tin hồ sơ: thông tin cá nhân, kinh nghiệm,
                  dạy kèm,...
                </span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>Đã phỏng vấn</span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>Đã đào tạo quy trình dạy kèm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="action">
            <div className="label">Thuê gia sư</div>

            <div className="price">Học phí: {formatPrice(100000)} / 1 giờ</div>

            <Select
              defaultValue="1 giờ"
              onChange={(value) => setHour(+value)}
              style={{ width: '100%' }}
            >
              <Select.Option value="1">1 giờ</Select.Option>
              <Select.Option value="2">2 giờ</Select.Option>
              <Select.Option value="3">3 giờ</Select.Option>
            </Select>

            <Button
              type="primary"
              onClick={handleCreateClassroom}
              disabled={data?.status && isCurrentStudent === 'ACTIVE'}
              loading={data?.status && isCurrentStudent === 'PENDING'}
            >
              {data?.status && isCurrentStudent === 'PENDING'
                ? 'Đang chờ giáo viên'
                : 'Đăng ký học'}
            </Button>

            {data?.status && isCurrentStudent === 'ACTIVE' && (
              <a href={data?.linkRoom} target="_blank" className="linkzoom">
                <Icon icon="akar-icons:zoom-fill" color="#2d8cff" />
                Click để tham gia lớp học
              </a>
            )}
          </div>
        </div>

        <Modal
          title={false}
          visible={isModalFeedback}
          onOk={handleFeedbackTeacher}
          onCancel={() => setModalFeedback(false)}
        >
          <div className="title">
            Đánh giá giáo viên để nâng cao chất lượng nhé
          </div>

          <Rate allowHalf onChange={(value) => setRate(value)} />

          <Input.TextArea
            rows={4}
            onChange={(e) => setContent(e?.target?.value)}
          />
        </Modal>
      </div>

      <div className="feedback"></div>
    </div>
  );
};

export default TeacherDetailPage;
