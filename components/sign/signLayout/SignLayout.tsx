import React from "react";
import styles from "./SignLayout.module.scss";
import classNames from "classnames/bind";
import Logo from "@/components/common/logo/Logo";
import Input from "@/components/sign/input/input";
import SignBottom from "@/components/sign/signBotton/SignBotton";
import SignButton from "@/components/sign/signButton/SignButton";

const cn = classNames.bind(styles);

export default function SignLayout() {
  return (
    <div className={cn("signLayoutWrap")}>
      <div className={cn("signWrap")}>
        <div className={cn("logoWarp")}>
          <Logo size="large" />
        </div>
        <div className={cn("inputLayout")}>
          <Input label="이메일" inputType="email" errorMessage="잘못된 이메일입니다." />
          <Input label="비밀번호" inputType="password" errorMessage="8자 이상 입력해 주세요." />
          <SignButton text="로그인 하기" />
        </div>
        <div className={cn("signBottomWrap")}>
          <SignBottom text="이미 가입하셨나요?" href="/signin" textLink="로그인하기" />
        </div>
      </div>
    </div>
  );
}
