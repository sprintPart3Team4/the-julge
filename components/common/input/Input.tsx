import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

export interface InputProps {
  label: string;
  title: string;
  input: {
    type: string,
    id: string,
    name: string,
  }
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  floatingText?: string;
  placeholder?: string;
  value?: any
}

export default function Input({ label, title, input, onChange, floatingText, placeholder, value }: InputProps) {
  return (
    <div className={cn("box")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <input
        className={cn("dataInput")}
        placeholder={placeholder}
        {...input}
        onChange={onChange}
        value={value}
      />
      {floatingText && (
        <span className={cn("floatingText")}>{floatingText}</span>
      )}
    </div>
  );
}