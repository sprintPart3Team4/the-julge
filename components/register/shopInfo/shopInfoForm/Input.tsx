import { Input } from "./type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Input({ label, title, input, value, floatingText, onChange }: Input) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <div className={cn("wrap")}>
      <input {...input} placeholder="입력" value={value} onChange={onChange} />
      {floatingText && (
        <span className={cn("floatingText")}>{floatingText}</span>
      )}
      </div>  

    </div>
  );
}
