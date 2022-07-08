import React, { useState, useEffect, useContext } from 'react';

import { Modal } from 'antd';
import { isEmpty, isUndefined } from 'lodash';
import { Routes, Route } from 'react-router-dom';
import { SocketContext } from 'src/contexts/socket';
import { getUserProfile } from 'src/utils/clientCache';
import { actionTeacher, finishTeach } from 'src/core/api/classroom';

import Meeting from 'src/assets/images/meeting.json';

import routes from './core/routes';
import { AnimationImage, Button } from './components';

const App = () => {
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState({});
  const [isModalTeacher, setModalTeacher] = useState(false);

  const user = getUserProfile();

  const getCurrentTeacher = () => {
    if (isUndefined(data || user)) return {};

    if (data?.teacher?._id !== user?._id) return {};

    return user;
  };

  const currentUser = getCurrentTeacher();

  useEffect(() => {
    socket.on('BE_CLASSROOM_PENDING', (res) => {
      setData(res);
    });

    socket.on('BE_CLASSROOM_ACTIVE', (res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (isEmpty(data) || isEmpty(currentUser)) return;

    setModalTeacher(true);
  }, [data, currentUser]);

  const renderInfoStudent = () => {
    const firstName = data?.student?.profile?.firstName;
    const lastName = data?.student?.profile?.lastName;
    const email = data?.student?.email;

    if (isEmpty(firstName) || isEmpty(lastName)) return <b>{email}</b>;

    return `${firstName} ${lastName}`;
  };

  const handleActionClass = async (isJoin) => {
    await actionTeacher({ id: data?.classroom?._id, isJoin });

    if (!isJoin) {
      setData({});
      setModalTeacher(false);
    }
  };

  console.log({ data });

  const handleFinishTeach = async () => {
    const res = await finishTeach(data?.classroom?._id);

    if (res?.data?.status === 'OK') {
      setData({});
      setModalTeacher(false);
    }
  };

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
        closable={false}
        maskClosable={false}
        visible={isModalTeacher}
        onOk={() => handleActionClass(true)}
        onCancel={() => handleActionClass(false)}
        okText="Đồng ý dạy"
        cancelText="Từ chối"
        okButtonProps={{
          disabled: data?.status === 'ACTIVE',
        }}
        cancelButtonProps={{
          disabled: data?.status === 'ACTIVE',
        }}
      >
        <div>Bạn đang có lời mời dạy từ học sinh {renderInfoStudent()}</div>

        <AnimationImage
          animationData={Meeting}
          height={240}
          style={{ margin: 24 }}
        />

        {data?.status === 'ACTIVE' && (
          <div>
            <a href={data?.linkRoom}>Ấn vào đây để vào link zoom</a>

            <Button
              type="primary"
              onClick={handleFinishTeach}
              style={{ width: '100%' }}
            >
              Hoàn tất dạy học
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
