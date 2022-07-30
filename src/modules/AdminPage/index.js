import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { CopyOutlined, TeamOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/utils/clientCache';
import { Icon } from '@iconify/react';

import TeacherManagment from './TeacherManagment';
import CommentManagment from './CommentManangment';

import CountUp from 'react-countup';

import {
  getAdminTotal,
  getSubjectFavorite,
  getTopTeacherAdmin,
} from 'src/core/api/admin';
import { Avatar } from 'src/components';

const { TabPane } = Tabs;

const AdminPage = () => {
  const navigate = useNavigate();
  const userProfile = getUserProfile();

  const [totalAdmin, setTotalAdmin] = useState({});
  const [topTeacher, setTopTeacher] = useState([]);
  const [subjectFavorite, setSubjectFavorite] = useState([]);

  console.log({ subjectFavorite });

  useEffect(() => {
    if (userProfile.email === 'coestarvn205@gmail.com') return;

    navigate('/');
  }, []);

  useEffect(() => {
    const getTotalAdmin = async () => {
      const res = await getAdminTotal();

      setTotalAdmin(res.data.data);
    };

    getTotalAdmin();
  }, []);

  useEffect(() => {
    const getTopTeacher = async () => {
      const res = await getTopTeacherAdmin();
      const newData = res.data.data.topTeacher.sort(
        (a, b) => b.profile.countRent - a.profile.countRent
      );

      setTopTeacher(newData);
    };

    getTopTeacher();
  }, []);

  useEffect(() => {
    const _getSubjectFavorite = async () => {
      const res = await getSubjectFavorite();

      setSubjectFavorite(res.data.data.subject);
    };

    _getSubjectFavorite();
  }, []);

  return (
    <div className="hl-ml-admin">
      <div className="information">
        <div
          className="information-item animate__animated animate__fadeInDown"
          style={{ '--animate-duration': '0.5s' }}
        >
          <div className="icon-wrapper" style={{ backgroundColor: 'tomato' }}>
            <Icon icon="ph:student" />
          </div>

          <div className="parameter">
            <div className="label">Tổng số học sinh</div>

            <CountUp end={totalAdmin.totalStudent} duration={1.25} />
          </div>
        </div>

        <div
          className="information-item animate__animated animate__fadeInDown animate__delay-0.5s"
          style={{ '--animate-duration': '0.75s' }}
        >
          <div
            className="icon-wrapper"
            style={{
              backgroundColor: '#6ccbe3',
            }}
          >
            <Icon icon="ph:chalkboard-teacher" />
          </div>

          <div className="parameter">
            <div className="label">Tổng số giáo viên</div>

            <CountUp end={totalAdmin.totalTeacher} duration={1.25} />
          </div>
        </div>

        <div
          className="information-item animate__animated animate__fadeInDown animate__delay-0.85s"
          style={{ '--animate-duration': '0.85s' }}
        >
          <div
            className="icon-wrapper"
            style={{
              backgroundColor: '#52e54d',
            }}
          >
            <Icon icon="teenyicons:school-outline" />
          </div>

          <div className="parameter">
            <div className="label">Tổng số lớp học</div>

            <CountUp end={totalAdmin.totalClassroom} duration={1.25} />
          </div>
        </div>
      </div>

      <div className="dashboard">
        <div className="top-teacher">
          <div className="title">Bảng xếp hạng top gia sư được thuê</div>

          <div className="top3">
            <div
              className="item animate__animated animate__fadeInDown"
              style={{ '--animate-duration': '0.75s' }}
            >
              <div className="number">
                {topTeacher?.[1]?.profile?.countRent}
              </div>

              <img src={topTeacher?.[1]?.profile?.avatar} />

              <Icon icon="noto:2nd-place-medal" />
            </div>
            <div
              className="item animate__animated animate__fadeInDown"
              style={{ '--animate-duration': '0.5s' }}
            >
              <div className="number">
                {topTeacher?.[0]?.profile?.countRent}
              </div>

              <img src={topTeacher?.[0]?.profile?.avatar} />

              <Icon icon="noto:1st-place-medal" />
            </div>

            <div
              className="item animate__animated animate__fadeInDown"
              style={{ '--animate-duration': '0.85s' }}
            >
              <div className="number">
                {topTeacher?.[2]?.profile?.countRent}
              </div>

              <img src={topTeacher?.[2]?.profile?.avatar} />

              <Icon icon="noto:3rd-place-medal" />
            </div>
          </div>

          <div className="top-others animate__animated animate__fadeInUp animate__delay-1s">
            {topTeacher
              .filter((_, index) => index > 2)
              .map((item, index) => {
                const newIndex = 3;

                return (
                  <div className="item" key={`top-teacher-${index}`}>
                    <div className="index">{newIndex + 1}</div>

                    <div className="info">
                      <Avatar src={item?.profile?.avatar} size={40} />

                      <p>
                        {item?.profile?.lastName} {item?.profile?.firstName}
                      </p>
                    </div>

                    <div className="count">{item?.profile?.countRent}</div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="subject-favorite">
          <div className="title">Bảng xếp hạng top gia sư được thuê</div>
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <div>
              <TeamOutlined />
              <span>Gia sư</span>
            </div>
          }
          key="1"
        >
          <TeacherManagment />
        </TabPane>

        <TabPane
          tab={
            <div>
              <CopyOutlined />
              <span>Ý kiến</span>
            </div>
          }
          key="2"
        >
          <CommentManagment />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
