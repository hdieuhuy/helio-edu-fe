import { Button, Modal } from 'antd';
import { isUndefined } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SocketContext } from 'src/contexts/socket';
import { getUserProfile } from 'src/utils/clientCache';

import routes from './core/routes';

const App = () => {
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState({});
  const [isModalTeacher, setModalTeacher] = useState(false);

  const user = getUserProfile();

  const getCurrentTeacher = () => {
    if (isUndefined(data || user)) return {};

    if (data?.teacher?._id === user?._id) return {};

    return data?.teacher;
  };

  console.log({ abc: getCurrentTeacher() });

  useEffect(() => {
    socket.on('BE_CLASSROOM_PENDING', (res) => {
      setData(res);
    });

    socket.on('BE_CLASSROOM_DONE', (res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <Routes>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              element={item.element}
            />
          );
        })}
      </Routes>

      <Modal
        title={false}
        visible={isModalTeacher}
        onCancel={() => setModalTeacher(false)}
        footer={false}
      >
        <div>
          Bạn đang có lời mời dạy từ học sinh{' '}
          {data?.student?.profile?.firstName || ''}{' '}
          {data?.student?.profile?.lastName || ''}
        </div>

        <Button type="primary">Đồng ý dạy</Button>
        <Button danger>Từ chối</Button>
      </Modal>
    </div>
  );
};

export default App;
