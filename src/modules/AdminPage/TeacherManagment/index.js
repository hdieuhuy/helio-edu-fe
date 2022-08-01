import React, { useState, useEffect } from 'react';

import { Table, Tag, Tooltip } from 'antd';
import { toast } from 'react-toastify';

import { formatPrice } from 'src/utils';
import { activeTeacher, getListTeacher } from 'src/core/api/teachers';

const TeacherManagment = () => {
  const [teachers, setTeachers] = useState([]);

  const data = teachers
    ?.filter((item) => item?.email !== 'coestarvn205@gmail.com')
    ?.map((item) => ({
      ...item.profile,
      name: `${item.profile.lastName} ${item.profile.firstName}`,
      id: item._id,
      email: item.email,
      active: item.active,
    }));

  const handleActiveTeacher = async (id) => {
    const res = await activeTeacher(id);

    if (res.data.status === 'OK') {
      const result = await getListTeacher();

      toast.success(res.data.message);
      return setTeachers(result?.data?.data?.teachers);
    }

    return toast.error(res.data.message);
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Công việc hiện tại',
      dataIndex: 'work',
      key: 'work',
    },
    {
      title: 'Tốt nghiệp',
      dataIndex: 'graduate',
      key: 'graduate',
    },
    {
      title: 'Giá thuê',
      dataIndex: 'priceRent',
      key: 'priceRent',
      render: (record) => {
        return formatPrice(record);
      },
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'introduce',
      key: 'introduce',
      width: '20%',
    },
    {
      title: 'CV',
      dataIndex: 'urlDegree',
      key: 'urlDegree',
      render: (record) => {
        if (!record) return null;

        return (
          <a href={record} target="_blank">
            CV của gia sư
          </a>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: '',
      render: (record) => {
        return record.active ? (
          <Tag color="var(--primary)">Đã kích hoạt</Tag>
        ) : (
          <Tooltip title="Ấn kích hoạt cho phép giáo viên dạy">
            <Tag
              style={{ cursor: 'pointer' }}
              color="var(--flamenco-color)"
              onClick={() => handleActiveTeacher(record.id)}
            >
              Chưa kích hoạt
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Trạng thái dạy học',
      dataIndex: '',
      key: '',
      render: (record) => {
        return record.isWorking ? (
          <Tag color="var(--primary)">Còn dạy</Tag>
        ) : (
          <Tag color="var(--flamenco-color)">Nghỉ dạy</Tag>
        );
      },
    },
  ];

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListTeacher();

      setTeachers(res?.data?.data?.teachers);
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

export default TeacherManagment;
