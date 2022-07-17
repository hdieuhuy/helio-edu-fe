import React, { useState, useEffect } from 'react';

import { ContainerOutlined } from '@ant-design/icons';
import { getNews } from 'src/core/api/news';

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const res = await getNews();

      setNewsData(res?.data?.data?.news || []);
    };

    getDetail();
  }, []);

  const handleGoNewsDetail = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="hl-ml-news">
      <div className="title">Tin tức</div>

      {newsData.length > 0 &&
        newsData.map((item, index) => (
          <div
            key={`news-item-${index}`}
            className="news-item"
            onClick={() => handleGoNewsDetail(item.link)}
          >
            <div className="label">
              {item.title}
              <span className="icon">
                <ContainerOutlined />
              </span>
            </div>

            <div className="desc">{item.desc}</div>

            <div className="src">Nguồn: VnExpress</div>
          </div>
        ))}
    </div>
  );
};

export default NewsPage;
