import React, { useEffect, useState } from 'react';
import { Empty, Tabs } from 'antd';
import { CopyOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/utils/clientCache';
import { Icon } from '@iconify/react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import TeacherManagment from './TeacherManagment';
import CommentManagment from './CommentManangment';

import CountUp from 'react-countup';

import {
  getSubject,
  getAdminTotal,
  getTopTeacherAdmin,
} from 'src/core/api/admin';
import { Avatar } from 'src/components';
import { isEmpty, isUndefined } from 'lodash';

import { useWindowSize } from 'src/utils';
import ClassroomManangment from './ClassroomManagment';

const { TabPane } = Tabs;

const range = ({
  from = 0,
  to,
  step = 1,
  length = Math.ceil((to - from) / step),
}) => Array.from({ length }, (_, i) => from + i * step);

const AdminPage = () => {
  const navigate = useNavigate();
  const userProfile = getUserProfile();

  const { width } = useWindowSize();

  const [totalAdmin, setTotalAdmin] = useState({});
  const [topTeacher, setTopTeacher] = useState([]);
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    if (userProfile?.email === 'admin@gmail.com') return;

    navigate('/');
  }, [userProfile]);

  useEffect(() => {
    if (userProfile?.email) return;

    navigate('/admin/login');
  }, [userProfile]);

  useEffect(() => {
    if (isUndefined(width) || width >= 1375) return;

    navigate('/not-support');
  }, [width]);

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
    const _getSubject = async () => {
      const res = await getSubject();

      setSubject(res.data.data.subject);
    };

    _getSubject();
  }, []);

  const newIndex = range({ from: 4, length: 10 });

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
                return {
                  ...item,
                  index: newIndex[index],
                };
              })
              .map((item, index) => {
                return (
                  <div className="item" key={`top-teacher-${index}`}>
                    <div className="index">{item?.index}</div>

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

        <div className="subject-favorite animate__animated animate__fadeInRight">
          <div className="title">
            Bảng dữ liệu môn học yêu thích trong vòng 1 tháng gần nhất
          </div>

          {isEmpty(subject) ? (
            <Empty title="Không có dữ liệu để hiển thị" />
          ) : (
            <BarChart
              width={900}
              height={600}
              data={subject}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" label="Số lượng" fill="#82ca9d" />
            </BarChart>
          )}
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

        <TabPane
          tab={
            <div>
              <HomeOutlined />
              <span>Lớp học</span>
            </div>
          }
          key="3"
        >
          <ClassroomManangment />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
