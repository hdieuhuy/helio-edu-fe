/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isNumber } from 'lodash';

import Loading from 'src/assets/images/loading.json';
import VerifyFaliure from 'src/assets/images/bug.png';
import VerifySuccess from 'src/assets/images/verifcation.png';

import { AnimationImage } from 'src/components';
import { verifyAccount } from 'src/core/api/students';

const Verification = () => {
  const { verifyCode } = useParams();
  const [isVerify, setVerify] = useState(0);

  useEffect(() => {
    if (!verifyCode) return;

    const _verifyAccount = async () => {
      const res = await verifyAccount(verifyCode);

      if (res.data.status === 'ERROR') return setVerify(false);

      return setVerify(true);
    };

    _verifyAccount();
  }, [verifyCode]);

  if (isNumber(isVerify)) {
    return (
      <div className="hl-ml-verification">
        <AnimationImage animationData={Loading} width={480} height={480} />

        <div className="title">Đang xác thực tài khoản</div>
      </div>
    );
  }

  if (!isVerify) {
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
