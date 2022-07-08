import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/utils/clientCache';

import TeacherManagment from './TeacherManagment';
import StudentManangment from './StudentManagment';
import ClassroomManangment from './ClassroomManagment';

const { TabPane } = Tabs;

const AdminPage = () => {
  const navigate = useNavigate();
  const userProfile = getUserProfile();

  useEffect(() => {
    if (userProfile.profile.email === 'coestarvn205@gmail.com') return;

    navigate('');
  }, []);

  return (
    <div className="hl-ml-admin">
      <div className="title">Trang quản lý thông tin</div>

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
              <UserOutlined />
              <span>Học sinh</span>
            </div>
          }
          key="2"
        >
          <StudentManangment />
        </TabPane>

        <TabPane
          tab={
            <div>
              <CalendarOutlined />
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
