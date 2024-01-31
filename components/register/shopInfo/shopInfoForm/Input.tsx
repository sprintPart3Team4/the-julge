import { Input } from "@/components/register/shopInfo/shopInfoForm/type";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function Input({ label, title, input, value, onChange }: Input) {
  return (
    <div className={cn("inputBox")}>
      <label htmlFor={label} className={cn("title")}>
        {title}*
      </label>
      <input {...input} placeholder="입력" value={value} onChange={onChange}/>
    </div>
  );
}
