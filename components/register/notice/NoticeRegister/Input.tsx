import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface InputProps {
  id: string;
  type: string;
  text: string;
  floatingText?: string;
  setter: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({
  id,
  type,
  text,
  floatingText,
  setter
}: InputProps) {
  return (
    <div className={cn("noticeData")}>
      <label htmlFor={id} className={cn("explan")}>
        {text}
      </label>
      <input
        id={id}
        className={cn("noticeInput")}
        type={type}
        placeholder="입력"
        onChange={setter}
        autoComplete="off"
      />
      {floatingText && <div className={cn("floatingText")}>{floatingText}</div>}
    </div>
  );
}