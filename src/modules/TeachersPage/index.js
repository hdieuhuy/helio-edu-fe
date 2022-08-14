import React, { useState, useEffect } from 'react';
import { Empty, Select } from 'antd';
import { getListTeacher } from 'src/core/api/teachers';

import CardInformation from './CardInformation';
import { isEmpty } from 'lodash';

const { Option } = Select;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [optionsFilter, setOptionsFilter] = useState({});

  const listSubjects = [
    'Văn học',
    'Hoá học',
    'Toán học',
    'Tiếng anh',
    'Sinh học',
    'Vật lý',
    'Lịch sử',
    'Địa lý',
    'Giáo dục công nhân',
    'Tin học',
    'Ngoại ngữ khác',

    'Luyện thi đại học',
    'Luyện chữ',
    'Tài chính',
  ];

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListTeacher();

      setTeachers(res?.data?.data?.teachers);
    };

    getTeachers();
  }, []);

  const renderTeacher = () => {
    const _teacher = teachers
      ?.filter((item) => item?.active && item?.profile?.isWorking)
      ?.filter((item) => {
        const filterItem = item?.profile?.subjects?.includes(
          optionsFilter?.subject
        );

        if (!optionsFilter?.subject) return item;

        return filterItem;
      })
      ?.filter((item) => {
        const filterItem = item?.profile?.gender === optionsFilter?.gender;

        if (!optionsFilter?.gender) return item;

        return filterItem;
      })
      ?.filter((item) => {
        const filterItem = item?.profile?.work === optionsFilter?.work;

        if (!optionsFilter?.work) return item;

        return filterItem;
      });

    if (isEmpty(_teacher)) {
      return <Empty description="Không tìm thấy gia sư phù hợp" />;
    }

    return _teacher?.map((item, index) => (
      <CardInformation data={item} key={`teacher-info-${index}`} />
    ));
  };

  return (
    <div className="hl-ml-teachers">
      <div className="header animate__animated animate__flipInX">
        <div className="title">
          <span>Tìm tiêu chí gia sư phù hợp</span>
        </div>

        <div className="options">
          <Select
            placeholder="Chọn Môn học"
            allowClear
            onChange={(value) => {
              setOptionsFilter((prev) => ({ ...prev, subject: value }));
            }}
          >
            {listSubjects.map((item, index) => (
              <Option value={item} key={`option-item-${index}`}>
                {item}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Giới tính"
            allowClear
            onChange={(value) => {
              setOptionsFilter((prev) => ({ ...prev, gender: value }));
            }}
          >
            <Option value="MALE">Nam</Option>
            <Option value="FEMALE">Nữ</Option>
          </Select>

          <Select
            placeholder="Đối tượng gia sư"
            allowClear
            onChange={(value) => {
              setOptionsFilter((prev) => ({ ...prev, work: value }));
            }}
          >
            <Option value="Sinh viên">Sinh viên</Option>
            <Option value="Người đi làm">Người đi làm</Option>
            <Option value="Giáo viên">Giáo viên</Option>
            <Option value="Giảng viên">Giảng viên</Option>
          </Select>
        </div>
      </div>

      <div className="container animate__animated animate__lightSpeedInRight">
        {renderTeacher()}
      </div>
    </div>
  );
};

export default TeachersPage;
