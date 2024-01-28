import React from "react";
import styles from "./input.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface InputProps {
  label: "이메일" | "비밀번호" | "비밀번호 확인";
  inputType: "email" | "password";
  errorMessage: "잘못된 이메일입니다." | "8자 이상 입력해 주세요." | "비밀번호가 일치하지 않습니다.";
}

export default function Input({ label, inputType, errorMessage }: InputProps) {
  return (
    <div className={cn("inputWrap")}>
      <label className={cn("inputLabel")}>{label}</label>
      <input className={cn("input")} placeholder="입력" type={inputType} />
      <small className={cn("errorMessage")}>{errorMessage}</small>
    </div>
  );
}
