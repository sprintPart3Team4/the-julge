import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface InputProps {
  id: string;
  type: string;
  text: string;
  setter: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  floatingText?: string;
  placeholder?: string;
}

export default function Input({
  id,
  type,
  text,
  setter,
  floatingText,
  placeholder,
}: InputProps) {
  return (
    <div className={cn("noticeData")}>
      <label htmlFor={id} className={cn("explan")}>
        {text}
      </label>
      <div className={cn("InputBox")}>
        <input
          id={id}
          className={cn("noticeInput")}
          type={type}
          placeholder={placeholder}
          onChange={setter}
          autoComplete="off"
        />
        {floatingText && (
          <div className={cn("floatingText")}>{floatingText}</div>
        )}
      </div>
    </div>
  );
}