import React, { useState, useEffect } from 'react';

import { Table } from 'antd';

import { getComments } from 'src/core/api/admin';

import moment from 'moment';

const CommentManangment = () => {
  const [comments, setComments] = useState([]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (record) => {
        if (!record) return '';

        return moment(record).format('DD/MM/YYYY');
      },
    },
  ];

  useEffect(() => {
    const _getComments = async () => {
      const res = await getComments();

      setComments(res?.data?.data?.comments);
    };

    _getComments();
  }, []);

  return (
    <div className="hl-ml-teacher-managment">
      <div>
        <Table dataSource={comments} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default CommentManangment;
