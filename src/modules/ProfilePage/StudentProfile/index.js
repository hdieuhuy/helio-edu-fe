import React from 'react';
import { Tabs } from 'antd';
import {
  KeyOutlined,
  IdcardOutlined,
  HistoryOutlined,
  DollarOutlined,
} from '@ant-design/icons';

import ChangePassword from './ChangePassword';
import FormProfile from './FormProfile';
import HistoryRent from './HistoryRent';
import StudentPayment from './Payment';

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

        <TabPane
          tab={
            <div>
              <HistoryOutlined />
              <span>Lịch sử thuê</span>
            </div>
          }
          key="3"
        >
          <HistoryRent />
        </TabPane>

        <TabPane
          tab={
            <div>
              <DollarOutlined />
              <span>Cổng thanh toán</span>
            </div>
          }
          key="4"
        >
          <StudentPayment />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
