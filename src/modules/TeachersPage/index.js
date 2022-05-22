import React from 'react';
import CardInformation from './CardInformation';

const TeachersPage = () => {
  return (
    <div className="hl-ml-teachers">
      <div className="header">
        <div className="title">Chọn tiêu chí tìm gia sư phù hợp</div>

        <div className="options"></div>
      </div>

      <div className="container">
        <CardInformation />
        <CardInformation />
        <CardInformation />
        <CardInformation />
        <CardInformation />
      </div>
    </div>
  );
};

export default TeachersPage;
