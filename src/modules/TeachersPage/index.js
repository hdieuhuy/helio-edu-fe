import React, { useState, useEffect } from 'react';
import { getListTeacher } from 'src/core/api/teachers';

import CardInformation from './CardInformation';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const res = await getListTeacher();

      setTeachers(res?.data?.data?.teachers);
    };

    getTeachers();
  }, []);

  return (
    <div className="hl-ml-teachers">
      <div className="header">
        <div className="title">Chọn tiêu chí tìm gia sư phù hợp</div>

        <div className="options"></div>
      </div>

      <div className="container">
        {teachers?.map((item, index) => (
          <CardInformation data={item} key={`teacher-info-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
