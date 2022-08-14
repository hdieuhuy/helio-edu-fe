import React, { useState, useEffect } from 'react';

import { Table, Tag } from 'antd';

import { getListClassroom } from 'src/core/api/admin';
import { isEmpty } from 'lodash';
import moment from 'moment';

const ClassroomManangment = () => {
  const [classrooms, setClassrooms] = useState([]);

  const data = classrooms?.filter(
    (item) => item?.email !== 'coestarvn205@gmail.com'
  );

  const columns = [
    {
      title: 'Gia sư',
      dataIndex: '',
      key: '',
      render: (record) => {
        if (
          isEmpty(record?.teacher?.profile?.lastName) ||
          isEmpty(record?.teacher?.profile?.firstName)
        )
          return record?.teacher?.email;

        return `${record?.teacher?.profile?.lastName} ${record?.teacher?.profile?.firstName}`;
      },
    },
    {
      title: 'Học sinh',
      dataIndex: '',
      key: '',
      render: (record) => {
        if (
          isEmpty(record?.student?.profile?.lastName) ||
          isEmpty(record?.student?.profile?.firstName)
        )
          return record?.student?.email;

        return `${record?.student?.profile?.lastName} ${record?.student?.profile?.firstName}`;
      },
    },
    {
      title: 'Trạng thái lớp học',
      dataIndex: '',
      key: '',
      render: (record) => {
        const stateObj = {
          DONE: 'Hoàn thành',
          PENDING: 'Đang chờ',
          CLOSE: 'Bị huỷ',
          Active: 'Đang hoạt động',
        };

        return (
          <div>
            <Tag>{stateObj[record.classroom.status]}</Tag>
          </div>
        );
      },
    },
    {
      title: 'Giờ bắt đầu thuê',
      dataIndex: '',
      key: '',
      render: (record) => {
        return moment(record?.classroom?.startTime).format('DD/MM/YYYY HH:MM');
      },
    },
    {
      title: 'Giờ kết thúc thuê',
      dataIndex: '',
      key: '',
      render: (record) => {
        return moment(record?.classroom?.endTime).format('DD/MM/YYYY HH:MM');
      },
    },
  ];

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListClassroom();

      setClassrooms(res?.data?.data?.classrooms);
    };

    getTeachers();
  }, []);

  return (
    <div className="hl-ml-teacher-managment">
      <div>
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default ClassroomManangment;
