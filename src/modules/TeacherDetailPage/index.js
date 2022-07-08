import React, { useContext, useEffect, useState } from 'react';

import { Input, Modal, Rate, Select, Tag } from 'antd';
import { Icon } from '@iconify/react';
import { isEmpty } from 'lodash';
import { SocketContext } from 'src/contexts/socket';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createClassroom } from 'src/core/api/classroom';
import { getDetailTeacher } from 'src/core/api/teachers';
import { feedbackForTeacher } from 'src/core/api/students';

import { Avatar, Button } from 'src/components';
import { addHours, formatPrice } from 'src/utils';
import { getUserProfile } from 'src/utils/clientCache';

const TeacherDetailPage = () => {
  const { socket } = useContext(SocketContext);
  const { id } = useParams();

  const [data, setData] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});

  const [hour, setHour] = useState(1);
  const [isModalFeedback, setModalFeedback] = useState(false);

  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');

  const user = getUserProfile();

  const isCurrentStudent = user?._id === data?.student?._id;

  useEffect(() => {
    if (isEmpty(id)) return;
    const getDetail = async () => {
      const res = await getDetailTeacher(id);

      setTeacherInfo(res?.data?.data?.teacher);
    };

    getDetail();
  }, [id]);

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

  console.log({ data });

  useEffect(() => {
    if (data?.status !== 'CLOSE' || !isCurrentStudent) return;

    toast('Giáo viên đã từ chối giảng dạy');
  }, [data]);

  useEffect(() => {
    if (data?.status !== 'DONE' || !isCurrentStudent) return;

    setModalFeedback(true);
  }, [data]);

  const handleCreateClassroom = () => {
    if (user?.profile?.money < teacherInfo?.profile?.priceRent)
      return toast.error('Số tiền không đủ để thuê');

    createClassroom({
      teacherID: teacherInfo?._id,
      studentID: user?._id,
      startTime: new Date(),
      endTime: addHours(hour),
    });
  };

  const handleFeedbackTeacher = async () => {
    const res = await feedbackForTeacher({
      studentID: user?._id,
      teacherID: teacherInfo?._id,
      content,
      rate,
    });

    if (res.data.status === 'OK') {
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  const renderSubjects = teacherInfo?.profile?.subjects?.map((item, index) => (
    <Tag color="green" key={`tag-subject-${index}`}>
      {item}
    </Tag>
  ));

  const renderGender = teacherInfo?.profile?.gender === 'MALE' ? 'Nam' : 'Nữ';

  return (
    <div className="hl-ml-teacher-detail">
      <div className="container">
        <div className="left-side">
          <div className="box-info">
            <div className="avatar">
              <Avatar src={teacherInfo?.profile?.avatar} />

              <div className="work">{teacherInfo?.profile?.work}</div>
            </div>

            <div className="main">
              <div className="full-name">
                {teacherInfo?.profile?.firstName}{' '}
                {teacherInfo.profile?.lastName}
              </div>

              <div className="graduate">{teacherInfo?.profile?.graduate}</div>

              <div className="subjects">
                <div className="label">Môn dạy</div>

                <div className="subject-item">{renderSubjects}</div>
              </div>
            </div>
          </div>

          <div className="box-info profile">
            <div className="label">Hồ sơ cá nhân</div>

            <div className="information">
              <div className="info-item">Giới tính - {renderGender}</div>

              <div className="introduce">{teacherInfo?.profile?.introduce}</div>
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

            <div className="price">
              Học phí: {formatPrice(+teacherInfo?.profile?.priceRent)} / 1 giờ
            </div>

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
              disabled={data?.status === 'ACTIVE' && isCurrentStudent}
              loading={data?.status === 'PENDING' && isCurrentStudent}
            >
              {data?.status === 'PENDING' && isCurrentStudent
                ? 'Đang chờ giáo viên'
                : 'Đăng ký học'}
            </Button>

            {data?.status === 'ACTIVE' && isCurrentStudent && (
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
          okText="Đánh giá"
          cancelText="Huỷ"
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
