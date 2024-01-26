import React from "react";
import styles from "./signButton.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface SignButtonProps {
  text: "로그인 하기" | "가입하기";
}

export default function SignButton({ text }: SignButtonProps) {
  return (
    <div>
      <button className={cn("signButton")}>{text}</button>
    </div>
  );
}
