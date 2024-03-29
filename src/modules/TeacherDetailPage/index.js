import React, { useContext, useEffect, useState } from 'react';

import { Input, Modal, Rate, Select, Tag, Comment } from 'antd';
import { Icon } from '@iconify/react';
import { isEmpty } from 'lodash';
import { SocketContext } from 'src/contexts/socket';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getFeedback } from 'src/core/api/feedback';
import { getDetailTeacher } from 'src/core/api/teachers';
import { feedbackForTeacher } from 'src/core/api/students';
import { createClassroom, actionTeacher } from 'src/core/api/classroom';

import { Avatar, Button } from 'src/components';
import { addHours, formatPrice } from 'src/utils';
import { getUserProfile, setUserProfile } from 'src/utils/clientCache';
import { HeaderContext } from 'src/contexts/header';

const TeacherDetailPage = () => {
  const { socket } = useContext(SocketContext);
  const { setRefreshHeader } = useContext(HeaderContext);
  const { id } = useParams();

  const [data, setData] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [feedbackTeacher, setFeedbackTeacher] = useState([]);

  const [hour, setHour] = useState(1);
  const [isModalFeedback, setModalFeedback] = useState(false);
  const [subject, setSubject] = useState('');

  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');

  const user = getUserProfile();

  const isCurrentStudent = user?._id === data?.student?._id;

  /**
   * Effects
   */
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

  useEffect(() => {
    if (data?.status !== 'CLOSE' || !isCurrentStudent) return;

    toast('Giáo viên đã từ chối giảng dạy');
  }, [data]);

  useEffect(() => {
    if (data?.status !== 'DONE' || !isCurrentStudent) return;

    setModalFeedback(true);
  }, [data]);

  useEffect(() => {
    if (data?.status !== 'PENDING' || !isCurrentStudent) return;

    setTimeout(() => {
      actionTeacher({ id: data?.classroom?._id, isJoin: false });
    }, 1000 * 60 * 3);
  }, [data]);

  useEffect(() => {
    if (data?.status !== 'ACTIVE' || !isCurrentStudent) return;

    const newUserProfile = {
      ...user,
      profile: {
        ...user.profile,
        money: user.profile.money - teacherInfo?.profile?.priceRent,
      },
    };

    setRefreshHeader((prev) => !prev);
    setUserProfile(newUserProfile);
  }, [data]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (isEmpty(id)) return;
    const getFeedbackTeacher = async () => {
      const res = await getFeedback(id);

      setFeedbackTeacher(res?.data?.data?.teacherFeedback);
    };

    getFeedbackTeacher();
  }, []);

  /**
   * Functions
   */
  const handleCreateClassroom = () => {
    if (user?.profile?.money < teacherInfo?.profile?.priceRent)
      return toast.error('Số tiền không đủ để thuê');

    if (isEmpty(subject)) return toast.error('Hãy chọn 1 môn học');

    createClassroom({
      subject,
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
      setModalFeedback(false);
      return toast.success(res.data.message);
    }

    return toast.error(res.data.message);
  };

  const renderInfoStudent = (info) => {
    const firstName = info?.profile?.firstName;
    const lastName = info?.profile?.lastName;
    const email = info?.email;

    if (isEmpty(firstName) || isEmpty(lastName)) return <b>{email}</b>;

    return `${firstName} ${lastName}`;
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
          <div
            className="box-info animate__animated animate__bounceInLeft"
            style={{ '--animate-duration': '0.5s' }}
          >
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

          <div
            className="box-info profile animate__animated animate__bounceInLeft"
            style={{ '--animate-duration': '0.75s' }}
          >
            <div className="label">Hồ sơ cá nhân</div>

            <div className="information">
              <div className="info-item">Giới tính - {renderGender}</div>

              <div className="introduce">{teacherInfo?.profile?.introduce}</div>
            </div>
          </div>

          <div
            className="box-info verify animate__animated animate__bounceInLeft"
            style={{ '--animate-duration': '0.85s' }}
          >
            <div className="label">Hồ sơ đã được xác thực</div>

            <div className="verify-wrapper">
              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>Đã phỏng vấn</span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>Đã xác thực thông tin hồ sơ</span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>Đã đào tạo quy trình dạy kèm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side animate__animated animate__bounceInRight">
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

            <Select
              style={{ width: '100%', marginTop: 4 }}
              placeholder="Hãy chọn 1 môn học"
              onChange={(value) => setSubject(value)}
            >
              {teacherInfo?.profile?.subjects?.map((item, index) => (
                <Select.Option value={item} key={`teacher-subject-${index}`}>
                  {item}
                </Select.Option>
              ))}
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

      {feedbackTeacher.length > 0 && (
        <div className="feedback">
          <div className="title">Đánh giá của các học sinh</div>

          {feedbackTeacher.map((item, index) => {
            return (
              <Comment
                content={item.feedback.map((el, i) => (
                  <div key={`comment-item-${i}`} className="comment-item">
                    <p>{el.content}</p>

                    <Rate allowHalf value={el.rate} disabled />
                  </div>
                ))}
                avatar={<Avatar src={item.profile.avatar} />}
                key={`feedback-item-${index}`}
                author={renderInfoStudent(item)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherDetailPage;
