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
import { getUserProfile } from 'src/utils/clientCache';

const TeacherDetailPage = () => {
  const { socket } = useContext(SocketContext);
  const { id } = useParams();

  const [data, setData] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [feedbackTeacher, setFeedbackTeacher] = useState([]);

  console.log({ feedbackTeacher });

  const [hour, setHour] = useState(1);
  const [isModalFeedback, setModalFeedback] = useState(false);

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

    toast('Gi??o vi??n ???? t??? ch???i gi???ng d???y');
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
      return toast.error('S??? ti???n kh??ng ????? ????? thu??');

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

  const renderGender = teacherInfo?.profile?.gender === 'MALE' ? 'Nam' : 'N???';

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
                <div className="label">M??n d???y</div>

                <div className="subject-item">{renderSubjects}</div>
              </div>
            </div>
          </div>

          <div className="box-info profile">
            <div className="label">H??? s?? c?? nh??n</div>

            <div className="information">
              <div className="info-item">Gi???i t??nh - {renderGender}</div>

              <div className="introduce">{teacherInfo?.profile?.introduce}</div>
            </div>
          </div>

          <div className="box-info verify">
            <div className="label">H??? s?? ???? ???????c x??c th???c</div>

            <div className="verify-wrapper">
              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>
                  ???? x??c th???c th??ng tin h??? s??: th??ng tin c?? nh??n, kinh nghi???m,
                  d???y k??m,...
                </span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>???? ph???ng v???n</span>
              </div>

              <div className="verify-item">
                <Icon icon="bi:check-circle-fill" />

                <span>???? ????o t???o quy tr??nh d???y k??m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="action">
            <div className="label">Thu?? gia s??</div>

            <div className="price">
              H???c ph??: {formatPrice(+teacherInfo?.profile?.priceRent)} / 1 gi???
            </div>

            <Select
              defaultValue="1 gi???"
              onChange={(value) => setHour(+value)}
              style={{ width: '100%' }}
            >
              <Select.Option value="1">1 gi???</Select.Option>
              <Select.Option value="2">2 gi???</Select.Option>
              <Select.Option value="3">3 gi???</Select.Option>
            </Select>

            <Button
              type="primary"
              onClick={handleCreateClassroom}
              disabled={data?.status === 'ACTIVE' && isCurrentStudent}
              loading={data?.status === 'PENDING' && isCurrentStudent}
            >
              {data?.status === 'PENDING' && isCurrentStudent
                ? '??ang ch??? gi??o vi??n'
                : '????ng k?? h???c'}
            </Button>

            {data?.status === 'ACTIVE' && isCurrentStudent && (
              <a href={data?.linkRoom} target="_blank" className="linkzoom">
                <Icon icon="akar-icons:zoom-fill" color="#2d8cff" />
                Click ????? tham gia l???p h???c
              </a>
            )}
          </div>
        </div>

        <Modal
          title={false}
          visible={isModalFeedback}
          okText="????nh gi??"
          cancelText="Hu???"
          onOk={handleFeedbackTeacher}
          onCancel={() => setModalFeedback(false)}
        >
          <div className="title">
            ????nh gi?? gi??o vi??n ????? n??ng cao ch???t l?????ng nh??
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
          <div className="title">????nh gi?? c???a c??c h???c sinh</div>

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
