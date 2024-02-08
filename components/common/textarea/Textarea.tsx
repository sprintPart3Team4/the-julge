import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Textarea.module.scss";

const cn = classNames.bind(styles);

export interface Textarea {
  label: string;
  title: string;
  textarea: {
    id: string;
    name: string;
  };
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ label, title, textarea, value, onChange }: Textarea) {
  return (
    <div className={cn("inputBox", "textarea")}>
      <label htmlFor={label} className={cn("title")}>
        {title}
      </label>
      <textarea {...textarea} className={cn("desc")} value={value} placeholder="입력" onChange={onChange}></textarea>
    </div>
  );
}
