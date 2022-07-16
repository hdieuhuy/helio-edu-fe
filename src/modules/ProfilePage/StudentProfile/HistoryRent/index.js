import React, { useState, useEffect } from 'react';

import { Table, Tag } from 'antd';

import styled from 'styled-components';
import { getUserProfile } from 'src/utils/clientCache';
import { getHistoryRent } from 'src/core/api/classroom';
import { isEmpty } from 'lodash';
import { formatPrice } from 'src/utils';
import moment from 'moment';

const TitleStyle = styled.div`
  font-size: 24px;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 16px;
`;

const HistoryRent = () => {
  const user = getUserProfile();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const _getHistoryRent = async () => {
      const res = await getHistoryRent({ studentID: user._id });

      if (isEmpty(res.data.data)) return;
      return setHistory(res.data.data.classrooms);
    };

    _getHistoryRent();
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Họ tên gia sư',
      dataIndex: '',
      key: '',
      render: (data) => {
        return (
          <div>
            {data?.teacherProfile?.[0]?.profile?.lastName}{' '}
            {data?.teacherProfile?.[0]?.profile?.lastName}
          </div>
        );
      },
    },
    {
      title: 'Giá thuê',
      dataIndex: '',
      key: '',
      render: (data) => {
        return (
          <div>
            {formatPrice(data?.teacherProfile?.[0]?.profile?.priceRent)}
          </div>
        );
      },
    },
    {
      title: 'Giờ bắt đầu thuê',
      dataIndex: '',
      key: '',
      render: (data) => {
        return (
          <div>
            {moment(data?.classroom?.startTime).format('DD/MM/YYYY HH:MM:ss')}
          </div>
        );
      },
    },
    {
      title: 'Giờ kết thúc thuê',
      dataIndex: '',
      key: '',
      render: (data) => {
        return (
          <div>
            {moment(data?.classroom?.endTime).format('DD/MM/YYYY HH:MM:ss')}
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: '',
      render: (data) => {
        const stateObj = {
          DONE: 'Hoàn thành',
          PENDING: 'Đang chờ',
          CLOSE: 'Bị huỷ',
          Active: 'Đang hoạt động',
        };

        return (
          <div>
            <Tag>{stateObj[data.classroom.status]}</Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className="hl-ml-history-rent">
      <TitleStyle>Lịch sử thuê gia sư</TitleStyle>

      <Table columns={columns} dataSource={history} pagination={false} />
    </div>
  );
};

export default HistoryRent;
