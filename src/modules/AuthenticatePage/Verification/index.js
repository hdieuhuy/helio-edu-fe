import React from 'react';
import { useParams } from 'react-router-dom';

import VerifyFaliure from 'src/assets/images/bug.png';
import VerifySuccess from 'src/assets/images/verifcation.png';

const Verification = () => {
  const { verifyCode } = useParams();
  const verify = false;
  console.log({ verifyCode });

  if (!verify) {
    return (
      <div className="hl-ml-verification verify-false">
        <img src={VerifyFaliure} alt="" />

        <div className="title">Xác thực thất bại</div>
      </div>
    );
  }

  return (
    <div className="hl-ml-verification">
      <img src={VerifySuccess} alt="" />

      <div className="title">Tài khoản bạn được xác thực thành công</div>
    </div>
  );
};

export default Verification;
