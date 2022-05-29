import React, { useContext, useEffect, useState } from 'react';

import { Tag } from 'antd';
import { Icon } from '@iconify/react';
import { SocketContext } from 'src/contexts/socket';

import { createClassroom } from 'src/core/api/classroom';
import { Button } from 'src/components';
import { addHours } from 'src/utils';

const TeacherDetailPage = () => {
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState({});
  console.log({ data });

  useEffect(() => {
    socket.on('BE_CLASSROOM_PENDING', (res) => {
      setData(res);
    });

    return () => socket.disconnect();
  }, []);

  // teacher
  useEffect(() => {}, [data]);

  const handleCreateClassroom = () => {
    createClassroom({
      teacherID: '6288fc67f66f16e695946f44',
      studentID: '62891cdc8258bd7b19a7d625',
      startTime: Date.now(),
      endTime: addHours(1),
    });
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
          <Button
            type="primary"
            onClick={handleCreateClassroom}
            loading={data?.status === 'PENDING'}
          >
            {data?.status === 'PENDING' ? 'Đang chờ giáo viên' : 'Đăng ký học'}
          </Button>
        </div>
      </div>

      <div className="feedback"></div>
    </div>
  );
};

export default TeacherDetailPage;
