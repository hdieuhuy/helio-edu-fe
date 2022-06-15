import React from 'react';
import { Tabs } from 'antd';
import { KeyOutlined, IdcardOutlined } from '@ant-design/icons';

import ChangePassword from './ChangePassword';
import FormProfile from './FormProfile';

const StudentProfile = () => {
  const { TabPane } = Tabs;

  return (
    <div className="hl-ml-student-profile">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <div>
              <IdcardOutlined />
              <span>Thông tin cá nhân</span>
            </div>
          }
          key="1"
        >
          <FormProfile />
        </TabPane>

        <TabPane
          tab={
            <div>
              <KeyOutlined />
              <span>Đổi mật khẩu</span>
            </div>
          }
          key="2"
        >
          <ChangePassword />
        </TabPane>

        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
