import { Input } from "./type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Input({ label, title, input, onChange }: Input) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <input {...input} placeholder="입력" onChange={onChange} />
    </div>
  );
}
