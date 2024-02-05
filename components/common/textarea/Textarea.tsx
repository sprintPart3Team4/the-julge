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
}

export default function Textarea({ label, title, textarea }: Textarea) {
  return (
    <div className={cn("inputBox", "textarea")}>
      <label htmlFor={label} className={cn("title")}>
        {title}
      </label>
      <textarea {...textarea} className={cn("desc")} placeholder="입력"></textarea>
    </div>
  );
}
