import React from 'react';
import NotFoundImage from 'src/assets/images/404.jpg';

const NotFound = () => {
  return (
    <div className="hl-ml-not-found">
      <div className="title">Lỗi!</div>

      <div className="desc">Trang không tồn tại</div>

      <div className="image">
        <img src={NotFoundImage} />
      </div>
    </div>
  );
};

export default NotFound;
