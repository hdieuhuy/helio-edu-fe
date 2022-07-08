import React, { useState, useEffect } from 'react';

import { Table } from 'antd';

import styled from 'styled-components';
import { getUserProfile } from 'src/utils/clientCache';
import { getHistoryRent } from 'src/core/api/classroom';
import { isEmpty } from 'lodash';

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

  console.log({ user, history });

  useEffect(() => {
    const _getHistoryRent = async () => {
      const res = await getHistoryRent();

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
      title: 'Họ tên',
      dataIndex: 'profile',
      key: 'profile',
      render: (personal) => {
        return (
          <div>
            {personal?.firstName} {personal?.lastName}
          </div>
        );
      },
    },
    {
      title: 'Giá thuê',
      dataIndex: 'profile',
      key: 'profile',
      render: (personal) => {
        return <div>{personal?.priceRent}</div>;
      },
    },
  ];

  return (
    <div className="hl-ml-history-rent">
      <TitleStyle>Lịch sử thuê gia sư</TitleStyle>

      <Table columns={columns} dataSource={history} />
    </div>
  );
};

export default HistoryRent;
