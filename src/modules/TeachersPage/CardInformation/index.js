import React from 'react';

import { Tag } from 'antd';
import { formatPrice } from 'src/utils';
import { Button } from 'src/components';

const CardInformation = () => {
  return (
    <div className="hl-ml-card-information">
      <div className="general">
        <div className="avatar">
          <img
            src="https://haycafe.vn/wp-content/uploads/2022/01/Avt-meo-ff-cute-qua.jpg"
            alt=""
          />
        </div>

        <div className="work">Sinh Viên</div>

        <div className="price">{formatPrice(100000)} / 1 giờ</div>
      </div>

      <div className="main">
        <div className="full-name">Nguyễn Ngọc Tuấn</div>

        <div className="graduate">Tốt nghiệp Đại học Bách Khoa</div>

        <div className="divider" />

        <div className="subjects">
          <div className="label">Môn dạy</div>

          <div className="subject-item">
            <Tag color="green">Toán</Tag>
            <Tag color="green">Văn Học</Tag>
            <Tag color="green">Hoá Học</Tag>
            <Tag color="green">Hoá Học</Tag>
          </div>
        </div>
      </div>

      <div className="introduce">
        <div className="label">
          <span>Giới thiệu</span>
        </div>

        <span className="text">
          Kinh nghiệm: Đã từng làm trợ giảng, tutor, private tutor, teacher tại
          trung tâm Bambi English, NewYork Spring Board hơn 1 năm. Làm tutor ôn
          thi chứng chỉ Cambridge cho các bé Starters Movers Flyers KET (hiện
          tại đang ôn 2 bé Movers, 1 bé Flyers, 1 bé KET)…. Dạy chương trình
          sách giáo khoa, anh văn giao tiếp cho 2 chị chuẩn bị đi Úc.
        </span>

        <div className="btn">
          <Button type="primary">Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
};

export default CardInformation;
