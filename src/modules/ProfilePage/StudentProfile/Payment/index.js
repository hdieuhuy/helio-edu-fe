import React from 'react';
import MomoImg from 'src/assets/images/momo.png';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0 168px;

  img {
    width: 80px;
  }

  .phone {
    font-size: 18px;
    font-family: var(--font-family-main);

    padding-top: 16px;
  }

  p {
    font-size: 18px;
    padding-top: 16px;

    .bold {
      font-size: var(--color-primary);
      font-family: var(--font-family-semibold);
    }
  }
`;

const StudentPayment = () => {
  return (
    <Container>
      <img src={MomoImg} />
      <span className="phone">SĐT: 0767429812</span>

      <p>
        Sau khi chuyển khoản vui lòng liên hệ qua:{' '}
        <span className="bold">hdieuhuy227@gmail.com</span> hoặc SĐT{' '}
        <span className="bold">0767429812</span>
      </p>
    </Container>
  );
};

export default StudentPayment;
