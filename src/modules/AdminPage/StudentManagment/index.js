import React, { useState, useEffect } from 'react';

import { Table } from 'antd';

import { formatPrice } from 'src/utils';
import { getListStudent } from 'src/core/api/students';
import moment from 'moment';

const StudentManangment = () => {
  const [students, setStudents] = useState([]);

  const data = students
    ?.filter((item) => item?.email !== 'coestarvn205@gmail.com')
    ?.map((item) => ({
      ...item.profile,
      name: `${item.profile.lastName} ${item.profile.firstName}`,
      id: item._id,
      email: item.email,
    }));

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Sinh nhật',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (record) => {
        if (!record) return '';

        return moment(record).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Tiền trong ví',
      dataIndex: 'money',
      key: 'money',
      render: (record) => {
        return formatPrice(record);
      },
    },
  ];

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListStudent();

      setStudents(res?.data?.data?.student);
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

export default StudentManangment;
