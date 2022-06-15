import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { Tag } from 'antd';
import { formatPrice } from 'src/utils';
import { Button, Avatar } from 'src/components';

const CardInformation = ({ data }) => {
  const navigate = useNavigate();

  const renderSubjects = data?.profile?.subjects?.map((item, index) => (
    <Tag color="green" key={`tag-subject-${index}`}>
      {item}
    </Tag>
  ));

  const goDetailTeacher = () => {
    navigate(`/teacher/${data?._id}`);
  };

  return (
    <div className="hl-ml-card-information">
      <div className="general">
        <div className="avatar">
          <Avatar src={data?.profile?.avatar} />
        </div>

        <div className="work">{data?.profile?.work}</div>

        <div className="price">
          {formatPrice(+data?.profile?.priceRent)} / 1 giờ
        </div>
      </div>

      <div className="main">
        <div className="full-name">
          {data?.profile?.firstName} {data?.profile?.lastName}
        </div>

        <div className="graduate">{data?.profile?.graduate}</div>

        <div className="divider" />

        <div className="subjects">
          <div className="label">Môn dạy</div>

          <div className="subject-item">{renderSubjects}</div>
        </div>
      </div>

      <div className="introduce">
        <div className="label">
          <span>Giới thiệu</span>
        </div>

        <span className="text">{data?.profile?.introduce}</span>

        <div className="btn">
          <Button type="primary" onClick={goDetailTeacher}>
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardInformation;

CardInformation.propTypes = {
  data: PropTypes.array,
};

CardInformation.defaultProps = {
  data: [],
};
