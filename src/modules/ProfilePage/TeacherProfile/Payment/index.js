import React from 'react';
import styled from 'styled-components';

import ComingSoon from 'src/assets/images/comingsoon.json';
import { AnimationImage } from 'src/components';

const Container = styled.div`
  width: 100%;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 28px;
  font-weight: bold;
`;

const TeacherPayment = () => {
  return (
    <Container>
      <AnimationImage animationData={ComingSoon} width={180} />
      <p>Tính năng đang nằm trong giai đoạn phát triển</p>
    </Container>
  );
};

export default TeacherPayment;
